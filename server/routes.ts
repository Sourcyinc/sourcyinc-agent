import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

// Chat message schema
const chatMessageSchema = z.object({
  message: z.string().min(1),
  sender: z.enum(["user", "agent"]),
  timestamp: z.string().optional(),
  chatId: z.string().min(1),
});

// N8N webhook URL
const N8N_WEBHOOK_URL = "https://n8n.sourcyinc.com/webhook/03c90cf6-deaf-4151-bd38-4b2c06ee0d48";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Chat webhook endpoint (same as brightcoast)
  app.post("/api/chat", async (req, res) => {
    console.log("Received POST /api/chat request");
    console.log("Request body:", req.body);
    try {
      // Validate request body
      const validatedData = chatMessageSchema.parse(req.body);
      console.log("Validated data:", validatedData);
      
      // Forward to n8n webhook
      console.log("Forwarding to n8n webhook:", N8N_WEBHOOK_URL);
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
      });

      console.log("n8n response status:", response.status);

      if (!response.ok) {
        throw new Error(`n8n webhook returned ${response.status}`);
      }

      const data = await response.json();
      console.log("n8n response data:", data);
      
      // Return the response from n8n
      res.json(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid request data",
          errors: error.errors 
        });
      } else {
        console.error("Error forwarding to n8n:", error);
        res.status(500).json({ 
          message: "Failed to process chat message" 
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
