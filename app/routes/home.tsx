import type { Route } from "./+types/home";
import Header from "~/components/Header";
import Pagination from "~/components/Pagination";
import ProductCard from "~/components/ProductCard";
import ProductFilters from "~/components/ProductFilters";
import { getCategories, getProducts } from "~/lib/api.server";

export function meta() {
  return [
    { title: "LTP Store" },
    {
      name: "description",
      content: "Simple online store built for the LTP Labs assessment",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  const pageParam = Number(url.searchParams.get("page") || "1");
  const categoryParam = url.searchParams.get("category") || "all";
  const sortParam = url.searchParams.get("sort") || "default";

  const [productsData, categories] = await Promise.all([
    getProducts({
      page: pageParam,
      category: categoryParam === "all" ? undefined : categoryParam,
      sort: sortParam === "default" ? undefined : sortParam,
    }),
    getCategories(),
  ]);

  return {
    ...productsData,
    categories,
    selectedCategory: categoryParam,
    selectedSort: sortParam,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const {
    products,
    categories,
    currentPage,
    totalPages,
    selectedCategory,
    selectedSort,
    total,
  } = loaderData;

  return (
    <div>
      <Header />

      <main className="container page-section">
        <section className="hero">
          <h1>Discover products for every style and need.</h1>
          <p>
            Browse products, filter by category, sort results, and navigate
            through pages using URL-driven state.
          </p>
        </section>

        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          selectedSort={selectedSort}
        />

        <section className="results-bar" aria-label="Results summary">
          <p className="results-bar__text">
            Showing <strong>{products.length}</strong> of <strong>{total}</strong>{" "}
            products
          </p>
        </section>

        {products.length > 0 ? (
          <>
            <section className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </section>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              category={selectedCategory}
              sort={selectedSort}
            />
          </>
        ) : (
          <section className="empty-state">
            No products were found for the selected filters.
          </section>
        )}
      </main>
    </div>
  );
}