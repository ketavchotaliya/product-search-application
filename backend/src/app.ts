import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { productRoutes } from "./routes/product.routes"
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { corsOptions } from "./config/cors";

const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors(corsOptions));

// Logging middleware
app.use(morgan("combined"));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Product Search API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
app.use("/api", productRoutes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;
