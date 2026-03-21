import { Link, useNavigation, useRouteError, isRouteErrorResponse } from "react-router";
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
  const navigation = useNavigation();

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

  const isNavigating = navigation.state === "loading";
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
              {isNavigating ? (
                <div className="product-grid" aria-live="polite" aria-busy="true">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <article
                      key={index}
                      className="product-card product-card--skeleton"
                    >
                      <div className="product-card__image-wrap skeleton-block" />
                      <div className="product-card__content">
                        <div className="skeleton-line skeleton-line--title" />
                        <div className="skeleton-line skeleton-line--price" />
                      </div>
                    </article>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="product-grid">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="store-empty-state">
                  No products match the selected category or sort option.
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

export function ErrorBoundary() {
  const error = useRouteError();

  let title = "Unable to load products";
  let message =
    "We could not load the product list right now. Please try again.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message =
      typeof error.data === "string"
        ? error.data
        : "The homepage could not be loaded.";
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="site-shell site-shell--home homepage">
      <section className="state-card">
        <p className="state-card__eyebrow">Homepage</p>
        <h1 className="state-card__title">{title}</h1>
        <p className="state-card__text">{message}</p>
        <div className="state-card__actions">
          <Link to="/" className="state-card__button">
            Retry
          </Link>
        </div>
      </section>
    </main>
  );
}