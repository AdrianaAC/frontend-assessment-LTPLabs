import { Link } from "react-router";
import type { Product } from "~/lib/types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card__image-link" aria-label={product.title}>
        <div className="product-card__image-wrap">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-card__image"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="product-card__content">
        <Link to={`/products/${product.id}`} className="product-card__title">
          {product.title}
        </Link>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
      </div>
    </article>
  );
}