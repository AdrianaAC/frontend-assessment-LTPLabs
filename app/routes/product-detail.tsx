import { Form, Link, redirect, useNavigation } from "react-router";
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
        </section>
      </main>
    </>
  );
}