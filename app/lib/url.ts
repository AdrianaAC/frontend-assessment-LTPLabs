export function buildProductsUrl({
  page,
  category,
  sort,
}: {
  page?: number;
  category?: string;
  sort?: string;
}) {
  const params = new URLSearchParams();

  if (page && page > 1) {
    params.set("page", String(page));
  }

  if (category && category !== "all") {
    params.set("category", category);
  }

  if (sort && sort !== "default") {
    params.set("sort", sort);
  }

  const query = params.toString();
  return query ? `/?${query}` : "/";
}