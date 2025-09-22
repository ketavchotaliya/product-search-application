import { Product, ProductSearchResponse } from "../types/product.types";

class ProductService {
  private readonly products: Product[] = [
    { id: 1, name: "Laptop Pro", category: "Electronics", price: 1200 },
    { id: 2, name: "T-shirt Red", category: "Clothing", price: 20 },
    { id: 3, name: "Gaming Mouse", category: "Electronics", price: 50 },
    { id: 4, name: "Running Shoes", category: "Footwear", price: 80 },
    { id: 5, name: "Jeans Blue", category: "Clothing", price: 40 },
    // Can add more data as per the need
  ];

  /**
   * Search products by name
   * @prams searchTerm - the search term (keyword) to filter the products
   * @returns Promise<ProductSearchResponse>
   */
  async searchProducts(searchTerm: string): Promise<ProductSearchResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!searchTerm || searchTerm.trim() === "") {
          resolve({
            products: [],
            total: 0,
            searchTerm: searchTerm.trim(),
          });
          return;
        }

        const filteredProducts = this.products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        resolve({
          products: filteredProducts,
          total: filteredProducts.length,
          searchTerm: searchTerm.trim(),
        });
      }, 5000); // 5000ms delay to simulate API call and show loading spinner
    });
  }

  /**
   * Get all products
   * @returns Promise<Product[]>
   */
  async getAllProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.products]);
      }, 500); // 500 ms delay to simulate API call and show loading spinner
    });
  }

  /**
   * Get product by ID
   * @param id - Product ID
   * @returns Promise<Product | null>
   */
  async getProductById(id: number): Promise<Product | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = this.products.find((p) => p.id === id);
        resolve(product || null);
      }, 300); // 300 ms delay to simulate API call and show loading spinner
    });
  }
}

export default new ProductService();
