import { Form } from "react-router";
import type { Route } from "./+types/cart";
import Header from "~/components/Header";
import { getProductsByIds } from "~/lib/api.server";
import {
  commitCart,
  getCart,
  getCartCount,
  removeItemFromCart,
} from "~/lib/cart.server";
import { redirect } from "react-router";
import { updateItemQuantity } from "~/lib/cart.server";

export function meta() {
  return [{ title: "Cart | LTP Store" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const cart = await getCart(request);

  if (cart.length === 0) {
    return {
      items: [],
      total: 0,
      cartCount: 0,
    };
  }

  const products = await getProductsByIds(cart.map((item) => item.productId));

  const items = cart
    .map((cartItem) => {
      const product = products.find((item) => item.id === cartItem.productId);

      if (!product) {
        return null;
      }

      return {
        product,
        quantity: cartItem.quantity,
        lineTotal: product.price * cartItem.quantity,
      };
    })
    .filter(Boolean);

  const total = items.reduce((sum, item) => sum + item!.lineTotal, 0);

  return {
    items,
    total,
    cartCount: getCartCount(cart),
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const productId = Number(formData.get("productId"));

  const cart = await getCart(request);

  if (!Number.isNaN(productId)) {
    if (intent === "remove") {
      const updatedCart = removeItemFromCart(cart, productId);

      return redirect("/cart", {
        headers: {
          "Set-Cookie": await commitCart(updatedCart),
        },
      });
    }

    if (intent === "increase") {
      const updatedCart = updateItemQuantity(cart, productId, +1);

      return redirect("/cart", {
        headers: {
          "Set-Cookie": await commitCart(updatedCart),
        },
      });
    }

    if (intent === "decrease") {
      const updatedCart = updateItemQuantity(cart, productId, -1);

      return redirect("/cart", {
        headers: {
          "Set-Cookie": await commitCart(updatedCart),
        },
      });
    }
  }

  return null;
}

export default function Cart({ loaderData }: Route.ComponentProps) {
  const { items, total, cartCount } = loaderData;

  return (
    <div>
      <Header cartCount={cartCount} />

      <main className="container page-section">
        <section className="hero">
          <h1>Your shopping cart</h1>
          <p>Review the items you have selected before checkout.</p>
        </section>

        <section className="cart-layout">
          <div className="cart-panel">
            {items.length === 0 ? (
              <div className="empty-state">Your cart is empty for now.</div>
            ) : (
              <>
                {items.map((item) => (
                  <article className="cart-item" key={item!.product.id}>
                    <img
                      className="cart-item__thumb"
                      src={item!.product.thumbnail}
                      alt={item!.product.title}
                    />

                    <div>
                      <h2 className="cart-item__title">
                        {item!.product.title}
                      </h2>

                      <div className="cart-item__quantity">
                        <Form method="post">
                          <input type="hidden" name="intent" value="decrease" />
                          <input
                            type="hidden"
                            name="productId"
                            value={item!.product.id}
                          />
                          <button type="submit">−</button>
                        </Form>

                        <span>{item!.quantity}</span>

                        <Form method="post">
                          <input type="hidden" name="intent" value="increase" />
                          <input
                            type="hidden"
                            name="productId"
                            value={item!.product.id}
                          />
                          <button type="submit">+</button>
                        </Form>
                      </div>

                      <p className="cart-item__meta">
                        Unit price: ${item!.product.price}
                      </p>
                    </div>

                    <div className="cart-item__aside">
                      <p className="cart-item__line-total">
                        ${item!.lineTotal}
                      </p>

                      <Form method="post">
                        <input type="hidden" name="intent" value="remove" />
                        <input
                          type="hidden"
                          name="productId"
                          value={item!.product.id}
                        />
                        <button
                          className="button button--secondary"
                          type="submit"
                        >
                          Remove
                        </button>
                      </Form>
                    </div>
                  </article>
                ))}

                <div className="cart-total">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
