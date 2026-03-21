import { Link } from "react-router";
import { buildProductsUrl } from "~/lib/url";

type Props = {
  categories: string[];
  selectedCategory: string;
  selectedSort: string;
};

export default function CategorySidebar({
  categories,
  selectedCategory,
  selectedSort,
}: Props) {
  const visibleCategories = categories.slice(0, 4);

  return (
    <aside className="store-sidebar" aria-label="Product categories">
      <h2 className="store-sidebar__title">Categories</h2>

      <div className="store-sidebar__list">
        {visibleCategories.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <Link
              key={category}
              to={buildProductsUrl({
                page: 1,
                category,
                sort: selectedSort,
              })}
              className={`store-sidebar__item ${isActive ? "is-active" : ""}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="store-sidebar__checkbox" aria-hidden="true" />
              <span className="store-sidebar__label">
                {formatCategoryLabel(category)}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

function formatCategoryLabel(category: string) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
