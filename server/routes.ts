import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth FIRST
  await setupAuth(app);
  registerAuthRoutes(app);

  // NEWS ROUTES
  app.get(api.news.list.path, async (req, res) => {
    const news = await storage.getNews();
    res.json(news);
  });

  // Protected: Create News
  app.post(api.news.create.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.news.create.input.parse(req.body);
      const newsItem = await storage.createNews(input);
      res.status(201).json(newsItem);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Protected: Delete News
  app.delete(api.news.delete.path, isAuthenticated, async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    await storage.deleteNews(id);
    res.status(204).send();
  });

  // CONTACT ROUTES
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const contact = await storage.createContact(input);
      res.status(201).json(contact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data
  await seed();

  return httpServer;
}

// Seed function (optional, can be called from index.ts if needed, but we'll leave it for now)
export async function seed() {
  const existingNews = await storage.getNews();
  if (existingNews.length === 0) {
    await storage.createNews({
      title: "Lancement du nouveau site Impactiv",
      content: "Nous sommes ravis de vous présenter notre nouvelle plateforme dédiée au coaching et à la formation.",
      category: "article",
      createdAt: new Date(),
    });
    await storage.createNews({
      title: "Podcast: Gestion du stress en entreprise",
      content: "Écoutez notre dernier épisode sur les techniques de gestion du stress pour les managers.",
      category: "podcast",
      linkUrl: "https://example.com/podcast",
      createdAt: new Date(),
    });
  }
}
