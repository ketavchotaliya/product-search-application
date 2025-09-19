import { Request, Response } from "express";
import productService from "../services/product.service";
import { ApiResponse, ProductSearchResponse } from "../types/product.types";

export class ProductController {
  /**
   * Search Products by Name
   * GET /api/products?search=searchTerm
   */
  async searchProducts(req: Request, res: Response) {
    const searchTerm = (req.query.search as string) || "";
    try {
      if (typeof searchTerm !== "string") {
        res.status(400).json({
          success: false,
          error:
            "Invalid search parameter. It should be a type of string only.",
        } as ApiResponse<string>);
        return;
      }

      const searchResult = await productService.searchProducts(searchTerm);

      res.status(200).json({
        success: true,
        data: searchResult,
      } as ApiResponse<ProductSearchResponse>);
      return;
    } catch (error) {
      console.log(
        `Error occurred while searching products based on searchTerm ${searchTerm}, Error: ${error}`
      );
      res.status(500).json({
        success: false,
        error: `Error occurred while searching products based on searchTerm ${searchTerm}`,
      } as ApiResponse<string>);
    }
  }
}
