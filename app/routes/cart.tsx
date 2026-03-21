import {
  Form,
  Link,
  redirect,
  useNavigation,
  useRouteError,
  isRouteErrorResponse,
} from "react-router";
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
      shipping: 20,
      total: 20,
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
  const shipping = 20;
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
      <Header cartCount={cartCount} variant="detail" />

      <main className="site-shell site-shell--detail cart-page">
        <div className="page-label">Shopping cart</div>

        {items.length === 0 ? (
          <section className="cart-empty">
            <h1 className="cart-empty__title">Your cart is empty</h1>
            <p className="cart-empty__text">
              You have not added any products yet. Start exploring the store and
              add a few items.
            </p>
            <Link to="/" className="cart-empty__link">
              Continue shopping
            </Link>
          </section>
        ) : (
          <section className="cart-layout">
            <div className="cart-items">
              {items.map((item) => {
                const isRowSubmitting = submittingProductId === item!.product.id;
                const isRemoving =
                  isRowSubmitting && submittingIntent === "remove";
                const isIncreasing =
                  isRowSubmitting && submittingIntent === "increase";
                const isDecreasing =
                  isRowSubmitting && submittingIntent === "decrease";
                const isAtMin = item!.quantity <= 1;
                const isAtMax = item!.quantity >= 99;

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
                      <div className="cart-item__info">
                        <p className="cart-item__title">{item!.product.title}</p>
                        <p className="cart-item__price">
                          ${item!.product.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="cart-item__controls">
                        <Form method="post" className="cart-item__quantity">
                          <input
                            type="hidden"
                            name="productId"
                            value={item!.product.id}
                          />

                          <button
                            type="submit"
                            name="intent"
                            value="decrease"
                            className="cart-item__qty-btn"
                            disabled={isRowSubmitting || isAtMin}
                            aria-label={`Decrease quantity of ${item!.product.title}`}
                          >
                            {isDecreasing ? "…" : "−"}
                          </button>

                          <span className="cart-item__qty-value">
                            {item!.quantity}
                          </span>

                          <button
                            type="submit"
                            name="intent"
                            value="increase"
                            className="cart-item__qty-btn"
                            disabled={isRowSubmitting || isAtMax}
                            aria-label={`Increase quantity of ${item!.product.title}`}
                          >
                            {isIncreasing ? "…" : "+"}
                          </button>
                        </Form>

                        <Form method="post" className="cart-item__remove-form">
                          <input
                            type="hidden"
                            name="productId"
                            value={item!.product.id}
                          />
                          <button
                            type="submit"
                            name="intent"
                            value="remove"
                            className="cart-item__remove"
                            disabled={isRowSubmitting}
                            aria-label={`Remove ${item!.product.title} from cart`}
                          >
                            {isRemoving ? (
                              "…"
                            ) : (
                              <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="cart-item__remove-icon"
                              >
                                <path
                                  d="M8 8H16L15.4 18H8.6L8 8Z"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9.5 8V6.8C9.5 5.9 10.2 5.2 11.1 5.2H12.9C13.8 5.2 14.5 5.9 14.5 6.8V8"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M7 8H17"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                />
                              </svg>
                            )}
                          </button>
                        </Form>
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

              <div className="cart-summary__divider" />

              <form
                className="cart-summary__promo"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="cart-summary__promo-field">
                  <label
                    htmlFor="promo-code"
                    className="cart-summary__promo-label"
                  >
                    Promo code
                  </label>
                  <input
                    id="promo-code"
                    type="text"
                    placeholder="Enter code"
                    className="cart-summary__promo-input"
                  />
                </div>

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

export function ErrorBoundary() {
  const error = useRouteError();

  let title = "Unable to load cart";
  let message = "We could not load your cart right now. Please try again.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message =
      typeof error.data === "string"
        ? error.data
        : "The cart page could not be loaded.";
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="site-shell site-shell--detail cart-page">
      <section className="state-card">
        <p className="state-card__eyebrow">Shopping cart</p>
        <h1 className="state-card__title">{title}</h1>
        <p className="state-card__text">{message}</p>
        <div className="state-card__actions">
          <Link to="/" className="state-card__button">
            Continue shopping
          </Link>
        </div>
      </section>
    </main>
  );
}
