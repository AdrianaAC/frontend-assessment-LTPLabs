import { Form, Link } from "react-router";
import type { Route } from "./+types/product-detail";
import Header from "~/components/Header";
import { getProductById } from "~/lib/api.server";

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.productId) {
    throw new Response("Product id is required", { status: 400 });
  }

  return await getProductById(params.productId);
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "Product" }];
  }

  return [{ title: `${data.title} | LTP Store` }];
}

export default function ProductDetail({ loaderData }: Route.ComponentProps) {
  const product = loaderData;

  return (
    <div>
      <Header />

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

            <Form method="post">
              <button className="button button--primary" type="submit">
                Add to cart
              </button>
            </Form>
          </div>
        </section>
      </main>
    </div>
  );
}