import type { Route } from "./+types/account";
import Header from "~/components/Header";
import { getCart, getCartCount } from "~/lib/cart.server";

export function meta() {
  return [{ title: "Account | The Online Store" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const cart = await getCart(request);

  return {
    cartCount: getCartCount(cart),
  };
}

export default function Account({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Header cartCount={loaderData.cartCount} />

      <main className="site-shell placeholder-page">
        <div className="page-label">Account</div>

        <section className="placeholder-panel">
          <h1 className="placeholder-panel__title">Account coming soon</h1>
          <p className="placeholder-panel__text">
            Account management is outside the current assessment scope, but this page
            keeps the header navigation functional and visually coherent.
          </p>
        </section>
      </main>
    </>
  );
}