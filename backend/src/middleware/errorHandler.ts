import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/product.types";

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  console.error(`Error: ${statusCode}: ${message}`);
  console.error(error.stack);

  const response: ApiResponse<never> = {
    success: false,
    message,
  };

  res.status(statusCode).json(response);
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const response: ApiResponse<never> = {
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  };

  res.status(404).json(response);
};
