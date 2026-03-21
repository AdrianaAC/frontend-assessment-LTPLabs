import {
  Form,
  Link,
  redirect,
  useNavigation,
  useRouteError,
  isRouteErrorResponse,
} from "react-router";
import type { Route } from "./+types/product-detail";
import Header from "~/components/Header";
import { getProductById } from "~/lib/api.server";
import {
  addItemToCart,
  commitCart,
  getCart,
  getCartCount,
} from "~/lib/cart.server";

export async function loader({ params, request }: Route.LoaderArgs) {
  if (!params.productId) {
    throw new Response("Product id is required", { status: 400 });
  }

  const [product, cart] = await Promise.all([
    getProductById(params.productId),
    getCart(request),
  ]);

  return {
    product,
    cartCount: getCartCount(cart),
  };
}

export async function action({ request, params }: Route.ActionArgs) {
  if (!params.productId) {
    throw new Response("Product id is required", { status: 400 });
  }

  const cart = await getCart(request);
  const updatedCart = addItemToCart(cart, Number(params.productId));

  return redirect("/cart?added=1", {
    headers: {
      "Set-Cookie": await commitCart(updatedCart),
    },
  });
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "Product | The Online Store" }];
  }

  return [{ title: `${data.product.title} | The Online Store` }];
}

export default function ProductDetail({ loaderData }: Route.ComponentProps) {
  const { product, cartCount } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isLoadingPage = navigation.state === "loading";
  const mainImage = product.images?.[0] ?? product.thumbnail;

  return (
    <>
      <Header cartCount={cartCount} />

      <main className="site-shell site-shell--detail product-detail-page">
        <div className="page-label">Product detail</div>

        <div className="product-detail__back-row">
          <Link to="/" className="product-detail__back-link">
            ← Back to products
          </Link>
        </div>

        <section className="product-detail">
          {isLoadingPage ? (
            <>
              <div className="product-detail__media skeleton-block" />
              <div className="product-detail__content">
                <div className="skeleton-line skeleton-line--detail-title" />
                <div className="skeleton-line skeleton-line--detail-price" />
                <div className="product-detail__button product-detail__button--loading">
                  Loading...
                </div>
                <div className="product-detail__divider" />
                <div className="product-detail__description">
                  <div className="skeleton-line skeleton-line--label" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line skeleton-line--short" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="product-detail__media">
                <img
                  src={mainImage}
                  alt={product.title}
                  className="product-detail__image"
                />
              </div>

              <div className="product-detail__content">
                <h1 className="product-detail__title">{product.title}</h1>

                <p className="product-detail__price">
                  ${product.price.toFixed(2)}
                </p>

                <Form method="post" className="product-detail__form">
                  <button
                    type="submit"
                    className="product-detail__button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding..." : "Add to Cart"}
                  </button>
                </Form>

                <div className="product-detail__divider" />

                <div className="product-detail__description">
                  <p className="product-detail__description-title">
                    Product Details
                  </p>
                  <p className="product-detail__description-text">
                    {product.description}
                  </p>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let title = "Unable to load product";
  let message =
    "This product could not be loaded right now. Please go back and try another item.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message =
      typeof error.data === "string"
        ? error.data
        : "The product detail page could not be loaded.";
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="site-shell site-shell--detail product-detail-page">
      <section className="state-card">
        <p className="state-card__eyebrow">Product detail</p>
        <h1 className="state-card__title">{title}</h1>
        <p className="state-card__text">{message}</p>
        <div className="state-card__actions">
          <Link to="/" className="state-card__button">
            Back to products
          </Link>
        </div>
      </section>
    </main>
  );
}