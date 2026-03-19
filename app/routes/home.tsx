import type { Route } from "./+types/home";
import Header from "~/components/Header";
import ProductCard from "~/components/ProductCard";
import { getProducts } from "~/lib/api.server";

export function meta() {
  return [
    { title: "LTP Store" },
    { name: "description", content: "Simple online store built for the LTP Labs assessment" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  return await getProducts();
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  return (
    <div>
      <Header />

      <main className="container page-section">
        <section className="hero">
          <h1>Discover products for every style and need.</h1>
          <p>
            A simple responsive store experience built with route-based data
            loading, clean UI structure, and room for cart, filters, sorting,
            and pagination.
          </p>
        </section>

        {products.length > 0 ? (
          <section className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        ) : (
          <section className="empty-state">
            No products were found.
          </section>
        )}
      </main>
    </div>
  );
}