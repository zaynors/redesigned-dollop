import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertArticleSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { Feed } from "feed";
import sanitizeHtml from "sanitize-html";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getAllArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/published", async (req, res) => {
    try {
      const articles = await storage.getPublishedArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch published articles" });
    }
  });

  app.get("/api/articles/slug/:slug", async (req, res) => {
    try {
      const article = await storage.getArticleBySlug(req.params.slug);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    try {
      const article = await storage.getArticle(req.params.id);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.post("/api/articles", async (req, res) => {
    try {
      const validatedData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(validatedData);
      res.status(201).json(article);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to create article" });
    }
  });

  app.patch("/api/articles/:id", async (req, res) => {
    try {
      const partialSchema = insertArticleSchema.partial();
      const validatedData = partialSchema.parse(req.body);
      const article = await storage.updateArticle(req.params.id, validatedData);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to update article" });
    }
  });

  app.delete("/api/articles/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteArticle(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete article" });
    }
  });

  app.get("/rss.xml", async (req, res) => {
    try {
      const articles = await storage.getPublishedArticles();
      const siteUrl = `${req.protocol}://${req.get("host")}`;

      const feed = new Feed({
        title: "Somali Diaspora News Network",
        description: "Latest news and stories from the Somali community worldwide",
        id: siteUrl,
        link: siteUrl,
        language: "en",
        image: `${siteUrl}/favicon.png`,
        favicon: `${siteUrl}/favicon.png`,
        copyright: `© ${new Date().getFullYear()} Somali Diaspora News Network`,
        updated: articles.length > 0 && articles[0].publishedAt 
          ? new Date(articles[0].publishedAt) 
          : new Date(),
        feedLinks: {
          rss2: `${siteUrl}/rss.xml`,
        },
      });

      articles.forEach((article) => {
        const publishDate = article.publishedAt 
          ? new Date(article.publishedAt) 
          : new Date(article.createdAt);

        const sanitizedContent = sanitizeHtml(article.content, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h2', 'h3']),
          allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ['src', 'alt', 'width', 'height'],
            a: ['href', 'target', 'rel'],
          },
        });

        feed.addItem({
          title: article.title,
          id: `${siteUrl}/article/${article.slug}`,
          link: `${siteUrl}/article/${article.slug}`,
          description: article.excerpt,
          content: sanitizedContent,
          author: [
            {
              name: article.author,
            },
          ],
          date: publishDate,
          category: [
            {
              name: article.category,
            },
          ],
          image: article.featuredImage || undefined,
        });
      });

      res.set("Content-Type", "application/rss+xml");
      res.send(feed.rss2());
    } catch (error) {
      console.error("RSS feed generation error:", error);
      res.status(500).send("Failed to generate RSS feed");
    }
  });

  app.get("/sitemap.xml", async (req, res) => {
    try {
      const articles = await storage.getPublishedArticles();
      const siteUrl = `${req.protocol}://${req.get("host")}`;

      let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
      sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      sitemap += `  <url>\n`;
      sitemap += `    <loc>${siteUrl}/</loc>\n`;
      sitemap += `    <changefreq>daily</changefreq>\n`;
      sitemap += `    <priority>1.0</priority>\n`;
      sitemap += `  </url>\n`;

      sitemap += `  <url>\n`;
      sitemap += `    <loc>${siteUrl}/admin</loc>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `    <priority>0.5</priority>\n`;
      sitemap += `  </url>\n`;

      articles.forEach((article) => {
        const publishDate = article.publishedAt 
          ? new Date(article.publishedAt) 
          : new Date(article.createdAt);
        const lastmod = publishDate.toISOString().split('T')[0];

        sitemap += `  <url>\n`;
        sitemap += `    <loc>${siteUrl}/article/${article.slug}</loc>\n`;
        sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
        sitemap += `    <changefreq>monthly</changefreq>\n`;
        sitemap += `    <priority>0.8</priority>\n`;
        sitemap += `  </url>\n`;
      });

      sitemap += '</urlset>';

      res.set("Content-Type", "application/xml");
      res.send(sitemap);
    } catch (error) {
      console.error("Sitemap generation error:", error);
      res.status(500).send("Failed to generate sitemap");
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
