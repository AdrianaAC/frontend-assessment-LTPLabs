import { Form, Link, redirect } from "react-router";
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

  return redirect("/cart", {
    headers: {
      "Set-Cookie": await commitCart(updatedCart),
    },
  });
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "Product" }];
  }

  return [{ title: `${data.product.title} | LTP Store` }];
}

export default function ProductDetail({ loaderData }: Route.ComponentProps) {
  const { product, cartCount } = loaderData;

  return (
    <div>
      <Header cartCount={cartCount} />

      <main className="container page-section">
        <Link to="/" className="back-link">
          ← Back to products
        </Link>

        <section className="product-detail">
          <div className="product-detail__media">
            <img src={product.thumbnail} alt={product.title} />
          </div>

          <div className="product-detail__content">
            <p className="product-detail__eyebrow">{product.category}</p>
            <h1 className="product-detail__title">{product.title}</h1>

            <p className="product-detail__meta">
              {product.brand ? `Brand: ${product.brand} · ` : ""}
              Rating: {product.rating} · Stock: {product.stock}
            </p>

            <p className="product-detail__price">${product.price}</p>

            <p className="product-detail__description">{product.description}</p>

            <div className="product-detail__actions">
              <Form method="post">
                <button className="button button--primary" type="submit">
                  Add to cart
                </button>
              </Form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}