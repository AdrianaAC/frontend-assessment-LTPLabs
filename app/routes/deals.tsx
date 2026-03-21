import type { Route } from "./+types/deals";
import Header from "~/components/Header";
import { getCart, getCartCount } from "~/lib/cart.server";

export function meta() {
  return [{ title: "Deals | The Online Store" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const cart = await getCart(request);

  return {
    cartCount: getCartCount(cart),
  };
}

export default function Deals({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Header cartCount={loaderData.cartCount} />

      <main className="site-shell placeholder-page">
        <div className="page-label">Deals</div>

        <section className="placeholder-panel">
          <h1 className="placeholder-panel__title">Deals coming soon</h1>
          <p className="placeholder-panel__text">
            Promotional campaigns and seasonal offers are not part of the current
            challenge scope, but this placeholder keeps the navigation consistent
            with the store layout.
          </p>
        </section>
      </main>
    </>
  );
}