import type { VercelRequest, VercelResponse } from "@vercel/node";
import serverless from "serverless-http";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

// Chat message schema (copied from shared/schema.ts)
const chatMessageSchema = z.object({
  message: z.string().min(1),
  sender: z.enum(["user", "agent"]),
  timestamp: z.string().optional(),
  chatId: z.string().min(1),
});

// N8N webhook URL (from server/routes.ts)
const N8N_WEBHOOK_URL = "https://n8n.arkoswearshop.com/webhook/03c90cf6-deaf-4151-bd38-4b2c06ee0d48";

// Register routes function - SIMPLIFICADO para serverless (NO necesita httpServer)
function registerRoutes(app: express.Express) {
  // Middleware para loggear TODAS las peticiones que llegan a Express
  app.use((req, res, next) => {
    console.log(`[Express Router] Incoming: ${req.method} ${req.path} (url: ${req.url}, originalUrl: ${req.originalUrl})`);
    next();
  });
  
  // Health check endpoint - para verificar que el servidor está funcionando
  app.get("/api/health", (req, res) => {
    console.log("[GET /api/health] Health check requested");
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "unknown",
      vercel: !!process.env.VERCEL,
      region: process.env.VERCEL_REGION || "unknown"
    });
  });

  // Chat webhook endpoint - DEBE estar ANTES del catch-all
  app.post("/api/chat", async (req, res) => {
    console.log("[POST /api/chat] ===== ENDPOINT CALLED =====");
    console.log("[POST /api/chat] Request received:", {
      body: req.body,
      url: req.url,
      path: req.path,
      method: req.method,
      timestamp: new Date().toISOString()
    });
    
    try {
      // Validate request body
      const validatedData = chatMessageSchema.parse(req.body);
      console.log("[POST /api/chat] Validated data:", validatedData);
      
      // Forward to n8n webhook con timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 segundos timeout
      
      try {
        console.log("[POST /api/chat] Forwarding to n8n:", N8N_WEBHOOK_URL);
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: validatedData.message,
            sender: validatedData.sender,
            timestamp: validatedData.timestamp || new Date().toISOString(),
            chatId: validatedData.chatId,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        console.log("[POST /api/chat] n8n response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text().catch(() => "Unknown error");
          console.error("[POST /api/chat] n8n error response:", errorText);
          throw new Error(`n8n webhook returned ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("[POST /api/chat] n8n response data:", data);
        
        // Return the response from n8n
        res.json(data);
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          console.error("[POST /api/chat] Request timeout to n8n");
          throw new Error("Request to n8n timed out after 15 seconds");
        }
        throw fetchError;
      }
    } catch (error) {
      console.error("[POST /api/chat] Error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid request data",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: "Failed to process chat message",
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // No necesitamos retornar httpServer en serverless
}

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app (NO crear servidor HTTP - no necesario en serverless)
const app = express();

// Middleware
app.use(
  express.json({
    verify: (req, _res, buf) => {
      (req as any).rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const requestPath = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (requestPath.startsWith("/api")) {
      const logLine = `${req.method} ${requestPath} ${res.statusCode} in ${duration}ms${
        capturedJsonResponse ? ` :: ${JSON.stringify(capturedJsonResponse)}` : ""
      }`;
      console.log(logLine);
    }
  });

  next();
});

// Initialize app (async setup)
let appInitialized = false;
let initPromise: Promise<void> | null = null;
let handler: ReturnType<typeof serverless> | null = null;

async function initializeApp() {
  if (appInitialized && handler) return handler;
  if (initPromise) {
    await initPromise;
    return handler!;
  }

  initPromise = (async () => {
    try {
      console.log("[InitializeApp] Starting initialization...");
      const startTime = Date.now();
      
      // PRIMERO y MÁS IMPORTANTE: Registrar rutas de API (debe estar ANTES de todo)
      registerRoutes(app);  // No es async, no necesita await
      console.log("[InitializeApp] API routes registered");
      
      // Verificar que las rutas estén registradas
      console.log("[InitializeApp] Registered routes:", app._router?.stack?.map((r: any) => ({
        path: r.route?.path,
        methods: r.route?.methods
      })).filter((r: any) => r.path) || "No routes found");
      
      // Error handler
      app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        console.error("[Express] Error:", err);
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        if (!res.headersSent) {
          res.status(status).json({ message, error: err.stack });
        }
      });

      // OPTIMIZACIÓN: Buscar archivos estáticos de forma rápida (solo un path más probable)
      // En Vercel, los archivos están en process.cwd()/dist/public
      const distPath = path.resolve(process.cwd(), "dist", "public");
      let staticFilesFound = false;
      
      try {
        // Solo verificar si existe, sin buscar en múltiples lugares
        if (fs.existsSync(distPath)) {
          staticFilesFound = true;
          console.log(`[InitializeApp] Found static files at: ${distPath}`);
          
          // Serve static files (JS, CSS, images, etc.)
          app.use(express.static(distPath, {
            maxAge: "1y",
            immutable: true
          }));
          
          // Catch-all para SPA routing (solo GET, solo rutas NO-API)
          app.get("*", (req, res, next) => {
            if (req.path.startsWith("/api")) {
              return next();
            }
            const indexPath = path.resolve(distPath, "index.html");
            if (fs.existsSync(indexPath)) {
              res.sendFile(indexPath);
            } else {
              next();
            }
          });
        }
      } catch (staticError) {
        console.warn("[InitializeApp] Error setting up static files:", staticError);
        // Continuar sin archivos estáticos - las rutas de API seguirán funcionando
      }

      if (!staticFilesFound) {
        console.warn("[InitializeApp] Static files not found - API routes will still work");
        // Catch-all mínimo para rutas NO-API
        app.get("*", (req, res, next) => {
          if (req.path.startsWith("/api")) {
            return next();
          }
          if (!res.headersSent) {
            res.status(404).json({ error: "Route not found", path: req.path });
          }
        });
      }

      // Catch-all para rutas no manejadas (solo si no se envió respuesta)
      app.use("*", (req, res, next) => {
        console.log(`[Express Catch-all] Unhandled route: ${req.method} ${req.path}`);
        
        if (req.path.startsWith("/api")) {
          if (!res.headersSent) {
            console.log(`[Express Catch-all] Returning 404 for API route: ${req.path}`);
            res.status(404).json({ error: "API route not found", path: req.path, method: req.method });
          } else {
            console.log(`[Express Catch-all] Headers already sent for ${req.path}`);
          }
        } else {
          // Para rutas no-API, el catch-all GET ya las maneja arriba
          if (!res.headersSent) {
            next(); // Pasar al siguiente middleware si hay
          }
        }
      });

      // Create serverless handler
      handler = serverless(app, {
        binary: ['image/*', 'application/pdf', 'application/octet-stream']
      });
      
      appInitialized = true;
      const initTime = Date.now() - startTime;
      console.log(`[InitializeApp] Initialization complete in ${initTime}ms`);
    } catch (error) {
      console.error("[InitializeApp] Error:", error);
      throw error;
    }
  })();

  await initPromise;
  return handler!;
}

// Vercel serverless function handler
export default async function vercelHandler(
  req: VercelRequest,
  res: VercelResponse
) {
  const requestStartTime = Date.now();
  
  // LOG INMEDIATO para verificar que la función se ejecuta
  console.log(`[VERCEL HANDLER] Function called at ${new Date().toISOString()}`);
  console.log(`[VERCEL HANDLER] Method: ${req.method}, URL: ${req.url}`);
  console.log(`[VERCEL HANDLER] Headers:`, JSON.stringify(req.headers, null, 2));
  
  try {
    // Respuesta inmediata si es un health check simple
    if (req.url === "/api/health" && req.method === "GET") {
      console.log("[VERCEL HANDLER] Fast path for health check");
      return res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        handler: "vercelHandler",
        initialization: "pending"
      });
    }
    
    console.log(`[VERCEL HANDLER] Starting initialization...`);
    const initStartTime = Date.now();
    
    // Inicializar la app
    const serverlessHandler = await initializeApp();
    
    const initTime = Date.now() - initStartTime;
    console.log(`[VERCEL HANDLER] Initialization completed in ${initTime}ms`);
    
    // Ejecutar el handler serverless
    console.log(`[VERCEL HANDLER] Executing serverless handler for ${req.method} ${req.url}`);
    console.log(`[VERCEL HANDLER] Request path: ${req.path}, url: ${req.url}`);
    
    try {
      // serverless-http maneja automáticamente la promesa de Express
      const result = await serverlessHandler(req, res);
      
      const requestTime = Date.now() - requestStartTime;
      
      // Verificar si la respuesta se envió
      if (res.headersSent) {
        console.log(`[VERCEL HANDLER] Response already sent (headers sent: true) in ${requestTime}ms`);
      } else {
        console.log(`[VERCEL HANDLER] WARNING: Response not sent after ${requestTime}ms - headers sent: false`);
      }
      
      console.log(`[VERCEL HANDLER] Request completed in ${requestTime}ms total`);
      
      return result;
    } catch (handlerError) {
      console.error(`[VERCEL HANDLER] Handler execution error:`, handlerError);
      throw handlerError;
    }
  } catch (error) {
    const requestTime = Date.now() - requestStartTime;
    console.error(`[VERCEL HANDLER] ERROR after ${requestTime}ms:`, error);
    console.error(`[VERCEL HANDLER] Error stack:`, error instanceof Error ? error.stack : "No stack");
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
        handler: "vercelHandler",
        errorType: error instanceof Error ? error.constructor.name : typeof error
      });
    }
  }
}

