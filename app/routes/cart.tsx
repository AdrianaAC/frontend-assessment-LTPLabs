import type { Route } from "./+types/cart";
import Header from "~/components/Header";

export function meta() {
  return [{ title: "Cart | LTP Store" }];
}

export async function loader({}: Route.LoaderArgs) {
  return { items: [] };
}

export default function Cart({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData;

  return (
    <div>
      <Header />

      <main className="container page-section">
        <section className="hero">
          <h1>Your shopping cart</h1>
          <p>Review the items you have selected before checkout.</p>
        </section>

        <section className="cart-layout">
          <div className="cart-panel">
            {items.length === 0 ? (
              <div className="empty-state">Your cart is empty for now.</div>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}