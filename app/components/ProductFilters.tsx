import { Form } from "react-router";

type Props = {
  categories: string[];
  selectedCategory: string;
  selectedSort: string;
};

export default function ProductFilters({
  categories,
  selectedCategory,
  selectedSort,
}: Props) {
  return (
    <Form method="get" className="filters" role="search">
      <div className="filters__group">
        <label className="filters__label" htmlFor="category">
          Category
        </label>
        <select
          className="filters__control"
          id="category"
          name="category"
          defaultValue={selectedCategory}
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {formatCategoryLabel(category)}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__group">
        <label className="filters__label" htmlFor="sort">
          Sort by
        </label>
        <select
          className="filters__control"
          id="sort"
          name="sort"
          defaultValue={selectedSort}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="title-asc">Name: A to Z</option>
          <option value="title-desc">Name: Z to A</option>
        </select>
      </div>

      <div className="filters__actions">
        <button className="button button--primary" type="submit">
          Apply
        </button>
      </div>
    </Form>
  );
}

function formatCategoryLabel(category: string) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}