import type { Product, ApiProduct } from "@/types/product";
import { mapApiProductsToProducts } from "@/features/products/services/product.mapper";

const API_URL = "https://apim-dev-proxy.sodhc.co/test-jasson/api/category";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: { data: { results: ApiProduct[] } } = await response.json();
    const apiProducts = data.data.results || [];

    return mapApiProductsToProducts(apiProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const products = await getProducts();
    return products.find((p) => p.id === id) ?? null;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};