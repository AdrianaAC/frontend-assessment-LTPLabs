import { Form } from "react-router";

type Props = {
  selectedCategory: string;
  selectedSort: string;
};

export default function ProductFilters({
  selectedCategory,
  selectedSort,
}: Props) {
  return (
    <Form method="get" className="store-sort-form">
      <input
        type="hidden"
        name="category"
        value={selectedCategory === "all" ? "" : selectedCategory}
      />

      <label htmlFor="sort" className="sr-only">
        Sort products
      </label>

      <select
        id="sort"
        name="sort"
        value={selectedSort}
        className="store-sort-select"
        aria-label="Sort products"
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
      >
        <option value="default">Sort by</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
      </select>
    </Form>
  );
}