import type { Product, ProductsResponse } from "./types";

const BASE_URL = "https://dummyjson.com";

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products?limit=12`);

  if (!response.ok) {
    throw new Response("Failed to fetch products", { status: response.status });
  }

  const data: ProductsResponse = await response.json();
  return data;
}

export async function getProductById(productId: string) {
  const response = await fetch(`${BASE_URL}/products/${productId}`);

  if (!response.ok) {
    throw new Response("Failed to fetch product", { status: response.status });
  }

  const data: Product = await response.json();
  return data;
}