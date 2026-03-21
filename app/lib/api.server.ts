import type { Product, ProductsResponse } from "./types";

const BASE_URL = "https://dummyjson.com";
const PAGE_SIZE = 9;

export type ProductsQuery = {
  page?: number;
  category?: string;
  sort?: string;
};

export async function getProducts({
  page = 1,
  category,
  sort,
}: ProductsQuery = {}) {
  const safeRequestedPage = Number.isNaN(page) || page < 1 ? 1 : page;

  const productsUrl = category
    ? `${BASE_URL}/products/category/${encodeURIComponent(category)}`
    : `${BASE_URL}/products?limit=0`;

  const response = await fetch(productsUrl);

  if (!response.ok) {
    if (response.status === 404) {
      return {
        products: [],
        total: 0,
        skip: 0,
        limit: PAGE_SIZE,
        currentPage: 1,
        pageSize: PAGE_SIZE,
        totalPages: 1,
      };
    }

    throw new Response("Failed to fetch products", { status: response.status });
  }

  const data: ProductsResponse = await response.json();
  const sortedProducts = sortProducts(data.products, sort);

  const total = sortedProducts.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(safeRequestedPage, totalPages);
  const skip = (currentPage - 1) * PAGE_SIZE;
  const paginatedProducts = sortedProducts.slice(skip, skip + PAGE_SIZE);

  return {
    products: paginatedProducts,
    total,
    skip,
    limit: PAGE_SIZE,
    currentPage,
    pageSize: PAGE_SIZE,
    totalPages,
  };
}

export async function getProductById(productId: string) {
  const response = await fetch(`${BASE_URL}/products/${productId}`);

  if (!response.ok) {
    throw new Response("Failed to fetch product", { status: response.status });
  }

  const data: Product = await response.json();
  return data;
}

export async function getProductsByIds(productIds: number[]) {
  const uniqueIds = [...new Set(productIds)];

  const products = await Promise.all(
    uniqueIds.map(async (productId) => {
      const response = await fetch(`${BASE_URL}/products/${productId}`);

      if (!response.ok) {
        throw new Response("Failed to fetch cart products", {
          status: response.status,
        });
      }

      return (await response.json()) as Product;
    }),
  );

  return products;
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/products/category-list`);

  if (!response.ok) {
    throw new Response("Failed to fetch categories", {
      status: response.status,
    });
  }

  const data: string[] = await response.json();
  return data;
}

function sortProducts(products: Product[], sort?: string) {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);

    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

    default:
      return sorted;
  }
}