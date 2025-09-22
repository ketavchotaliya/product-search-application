import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const router = Router();
const productController = new ProductController();

// GET /api/products?search=searchKey
router.get(
  "/products",
  productController.searchProducts.bind(productController)
);

export { router as productRoutes };
