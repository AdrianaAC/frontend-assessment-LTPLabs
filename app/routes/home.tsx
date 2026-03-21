import type { Route } from "./+types/home";
import CategorySidebar from "~/components/CategorySidebar";
import Header from "~/components/Header";
import Pagination from "~/components/Pagination";
import ProductCard from "~/components/ProductCard";
import ProductFilters from "~/components/ProductFilters";
import { getCategories, getProducts } from "~/lib/api.server";
import { getCart, getCartCount } from "~/lib/cart.server";

export function meta() {
  return [
    { title: "The Online Store" },
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

  const [productsData, categories, cart] = await Promise.all([
    getProducts({
      page: pageParam,
      category: categoryParam === "all" ? undefined : categoryParam,
      sort: sortParam === "default" ? undefined : sortParam,
    }),
    getCategories(),
    getCart(request),
  ]);

  return {
    ...productsData,
    categories,
    selectedCategory: categoryParam,
    selectedSort: sortParam,
    cartCount: getCartCount(cart),
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
    pageSize,
    cartCount,
  } = loaderData;

  const rangeStart = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = total === 0 ? 0 : Math.min(rangeStart + products.length - 1, total);

  return (
    <>
    <Header cartCount={cartCount} variant="home" />

      <main className="site-shell site-shell--home homepage">
        <div className="page-label">Homepage</div>

        <section className="store-layout">
          <div className="store-topbar">
            <ProductFilters
              selectedCategory={selectedCategory}
              selectedSort={selectedSort}
            />

            <p className="store-topbar__count">
              Showing {rangeStart}-{rangeEnd} of {total}
            </p>
          </div>

          <div className="store-body">
            <section className="store-grid-area" aria-label="Product list">
              {products.length > 0 ? (
                <div className="product-grid">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="store-empty-state">
                  No products were found for the selected filters.
                </div>
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                category={selectedCategory}
                sort={selectedSort}
              />
            </section>

            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              selectedSort={selectedSort}
            />
          </div>
        </section>
      </main>
    </>
  );
}