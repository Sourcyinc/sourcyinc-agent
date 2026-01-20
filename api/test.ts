// Versión mínima de test para verificar que Vercel ejecuta las funciones
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log("TEST FUNCTION CALLED:", req.method, req.url);
  
  return res.json({
    status: "test function works",
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString()
  });
}

