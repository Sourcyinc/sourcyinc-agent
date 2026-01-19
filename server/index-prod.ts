import fs from "node:fs";
import { type Server } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import express, { type Express, type Request } from "express";

import runApp from "./app";

// Get __dirname equivalent for ES modules (compatible with Node.js 18+)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function serveStatic(app: Express, server: Server) {
  // El build está en dist/public desde la raíz del proyecto
  // __dirname es server/, así que necesitamos ir un nivel arriba
  const distPath = path.resolve(__dirname, "..", "dist", "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  // but skip API routes - they should be handled by registerRoutes
  app.use("*", (req, res, next) => {
    // Skip API routes - let them be handled by registerRoutes
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

(async () => {
  await runApp(serveStatic);
})();
