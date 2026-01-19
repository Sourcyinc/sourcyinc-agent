import type { VercelRequest, VercelResponse } from "@vercel/node";
import serverless from "serverless-http";
import express from "express";
import { createServer } from "http";
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

// Register routes function (copied from server/routes.ts)
async function registerRoutes(httpServer: any, app: express.Express) {
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
    console.log("[POST /api/chat] Request received:", {
      body: req.body,
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

  return httpServer;
}

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();
const httpServer = createServer(app);

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
      
      // PRIMERO: Registrar rutas de API (esto es crítico - debe estar antes del catch-all)
      await registerRoutes(httpServer, app);
      console.log("[InitializeApp] API routes registered");
      
      // Error handler
      app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        console.error("[Express] Error:", err);
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        if (!res.headersSent) {
          res.status(status).json({ message, error: err.stack });
        }
      });

      // DESPUÉS: Serve static files and handle SPA routing (solo para rutas NO-API)
      // Optimizar: solo buscar archivos estáticos si no es una ruta de API
      const possiblePaths = [
        path.resolve(process.cwd(), "dist", "public"),
        path.resolve(process.cwd(), "..", "dist", "public"),
        path.resolve(__dirname, "..", "dist", "public"),
        path.resolve(__dirname, "..", "..", "dist", "public"),
      ];

      let distPath: string | null = null;
      for (const testPath of possiblePaths) {
        if (fs.existsSync(testPath)) {
          distPath = testPath;
          console.log(`[InitializeApp] Found static files at: ${distPath}`);
          break;
        }
      }

      if (distPath) {
        // Serve static files (JS, CSS, images, etc.)
        app.use(express.static(distPath, {
          maxAge: "1y",
          immutable: true
        }));
        
        // IMPORTANTE: Este catch-all debe ir DESPUÉS de las rutas de API
        // Solo para rutas GET que NO sean de API (para el SPA)
        app.get("*", (req, res, next) => {
          // Si es una ruta de API, NO hacer nada (debe ser manejado por las rutas de API arriba)
          if (req.path.startsWith("/api")) {
            return next(); // Pasar al siguiente middleware (debería retornar 404 si no encontró la ruta)
          }
          
          // Solo servir index.html para rutas NO-API (SPA routing)
          const indexPath = path.resolve(distPath!, "index.html");
          if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
          } else {
            console.error(`[InitializeApp] index.html not found at: ${indexPath}`);
            if (!res.headersSent) {
              res.status(500).json({ 
                error: "index.html not found",
                path: indexPath
              });
            }
          }
        });
        
        // Para otros métodos HTTP en rutas NO-API, retornar 404
        app.use("*", (req, res) => {
          if (req.path.startsWith("/api")) {
            // Si llegó aquí y es una ruta de API, significa que no se encontró el handler
            if (!res.headersSent) {
              res.status(404).json({ error: "API route not found", path: req.path });
            }
          } else {
            // Para rutas no-API con métodos que no sean GET, solo servir index.html si es GET
            // De lo contrario, 404
            if (!res.headersSent) {
              res.status(404).json({ error: "Route not found", path: req.path, method: req.method });
            }
          }
        });
      } else {
        console.warn("[InitializeApp] Static files not found, API will still work");
        // No fallback para archivos estáticos si no se encuentran
        // Pero las rutas de API seguirán funcionando
        app.get("*", (req, res) => {
          if (req.path.startsWith("/api")) {
            res.status(404).json({ error: "API route not found" });
          } else {
            res.status(500).json({ 
              error: "Static files not found. Build may have failed."
            });
          }
        });
      }

      // Create serverless handler
      handler = serverless(app, {
        binary: ['image/*', 'application/pdf', 'application/octet-stream']
      });
      appInitialized = true;
      console.log("[InitializeApp] Initialization complete");
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
  // Agregar timeout para evitar que la función tarde demasiado
  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      console.error("Function timeout after 25 seconds");
      res.status(504).json({ 
        error: "Gateway timeout",
        message: "The request took too long to process"
      });
    }
  }, 25000); // 25 segundos (menos que el límite de Vercel de 10s en free, 60s en pro)

  try {
    console.log(`[${new Date().toISOString()}] Incoming request: ${req.method} ${req.url}`);
    const serverlessHandler = await initializeApp();
    
    // Limpiar timeout si la función se completa
    clearTimeout(timeout);
    
    const result = await serverlessHandler(req, res);
    return result;
  } catch (error) {
    clearTimeout(timeout);
    console.error("Handler error:", error);
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
    }
  }
}

