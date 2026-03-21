import type { Route } from "./+types/contact";
import Header from "~/components/Header";
import { getCart, getCartCount } from "~/lib/cart.server";

export function meta() {
  return [{ title: "Contact | The Online Store" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const cart = await getCart(request);

  return {
    cartCount: getCartCount(cart),
  };
}

export default function Contact({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Header cartCount={loaderData.cartCount} />

      <main className="site-shell placeholder-page">
        <div className="page-label">Contact</div>

        <section className="placeholder-panel">
          <h1 className="placeholder-panel__title">Contact coming soon</h1>
          <p className="placeholder-panel__text">
            This placeholder page keeps the navigation complete and aligned with the
            store design while the core assessment pages remain the main focus.
          </p>
        </section>
      </main>
    </>
  );
}