import type { Route } from "./+types/shop";
import Header from "~/components/Header";
import { getCart, getCartCount } from "~/lib/cart.server";

export function meta() {
  return [{ title: "Shop | The Online Store" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const cart = await getCart(request);

  return {
    cartCount: getCartCount(cart),
  };
}

export default function Shop({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Header cartCount={loaderData.cartCount} />

      <main className="site-shell placeholder-page">
        <div className="page-label">Shop</div>

        <section className="placeholder-panel">
          <h1 className="placeholder-panel__title">Shop coming soon</h1>
          <p className="placeholder-panel__text">
            This section is intentionally left as a placeholder to keep the store
            navigation complete while preserving the challenge focus on homepage,
            product detail, and cart.
          </p>
        </section>
      </main>
    </>
  );
}