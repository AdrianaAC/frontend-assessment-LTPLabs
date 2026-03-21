import { Form, Link, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/cart";
import Header from "~/components/Header";
import { getProductsByIds } from "~/lib/api.server";
import {
  commitCart,
  getCart,
  getCartCount,
  removeItemFromCart,
  updateItemQuantity,
} from "~/lib/cart.server";

export function meta() {
  return [{ title: "Cart | The Online Store" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const cart = await getCart(request);

  if (cart.length === 0) {
    return {
      items: [],
      subtotal: 0,
      shipping: 0,
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

  const subtotal = items.reduce((sum, item) => sum + item!.lineTotal, 0);
  const shipping = items.length > 0 ? 20 : 0;
  const total = subtotal + shipping;

  return {
    items,
    subtotal,
    shipping,
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
  const { items, subtotal, shipping, total, cartCount } = loaderData;
  const navigation = useNavigation();
  const submittingFormData = navigation.formData;
  const submittingProductId = Number(submittingFormData?.get("productId"));
  const submittingIntent = submittingFormData?.get("intent");

  return (
    <>
      <Header cartCount={cartCount} />

      <main className="site-shell cart-page">
        <div className="page-label">Shopping cart</div>

        {items.length === 0 ? (
          <section className="cart-empty">
            <h1 className="cart-empty__title">Your cart is empty</h1>
            <p className="cart-empty__text">Add a few products and come back here.</p>
            <Link to="/" className="cart-empty__link">
              Continue shopping
            </Link>
          </section>
        ) : (
          <section className="cart-layout">
            <div className="cart-items">
              {items.map((item) => {
                const isRowSubmitting = submittingProductId === item!.product.id;

                return (
                  <article key={item!.product.id} className="cart-item">
                    <div className="cart-item__media">
                      <img
                        src={item!.product.thumbnail}
                        alt={item!.product.title}
                        className="cart-item__image"
                      />
                    </div>

                    <div className="cart-item__body">
                      <div className="cart-item__top">
                        <div>
                          <p className="cart-item__title">{item!.product.title}</p>
                          <p className="cart-item__price">${item!.product.price.toFixed(2)}</p>
                        </div>

                        <Form method="post">
                          <input type="hidden" name="productId" value={item!.product.id} />
                          <button
                            type="submit"
                            name="intent"
                            value="remove"
                            className="cart-item__remove"
                            disabled={isRowSubmitting}
                          >
                            {isRowSubmitting && submittingIntent === "remove" ? "Removing..." : "🗑"}
                          </button>
                        </Form>
                      </div>

                      <div className="cart-item__bottom">
                        <Form method="post" className="cart-item__quantity">
                          <input type="hidden" name="productId" value={item!.product.id} />

                          <button
                            type="submit"
                            name="intent"
                            value="decrease"
                            className="cart-item__qty-btn"
                            disabled={isRowSubmitting}
                          >
                            −
                          </button>

                          <span className="cart-item__qty-value">{item!.quantity}</span>

                          <button
                            type="submit"
                            name="intent"
                            value="increase"
                            className="cart-item__qty-btn"
                            disabled={isRowSubmitting}
                          >
                            +
                          </button>
                        </Form>

                        <p className="cart-item__line-total">${item!.lineTotal.toFixed(2)}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="cart-summary">
              <h2 className="cart-summary__title">Cart Summary</h2>

              <div className="cart-summary__row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="cart-summary__row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <div className="cart-summary__row cart-summary__row--total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button type="button" className="cart-summary__checkout">
                Check out
              </button>

              <p className="cart-summary__paypal">Or pay with PayPal</p>

              <form className="cart-summary__promo" onSubmit={(event) => event.preventDefault()}>
                <label htmlFor="promo-code" className="sr-only">
                  Promo code
                </label>
                <input
                  id="promo-code"
                  type="text"
                  placeholder="Enter code"
                  className="cart-summary__promo-input"
                />
                <button type="submit" className="cart-summary__promo-button">
                  Apply
                </button>
              </form>
            </aside>
          </section>
        )}
      </main>
    </>
  );
}