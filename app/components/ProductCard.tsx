import { Link } from "react-router";
import type { Product } from "~/lib/types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <article className="card">
      <Link to={`/products/${product.id}`}>
        <div className="card__image-wrap">
          <img
            className="card__image"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="card__body">
          <p className="card__category">{product.category}</p>
          <h2 className="card__title">{product.title}</h2>
          <p className="card__description">{product.description}</p>
          <p className="card__price">${product.price}</p>
        </div>
      </Link>
    </article>
  );
}