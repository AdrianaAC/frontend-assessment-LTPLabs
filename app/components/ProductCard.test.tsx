import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProductCard from "./ProductCard";

describe("ProductCard", () => {
  it("renders product title, price, and both product links", () => {
    render(
      <MemoryRouter>
        <ProductCard
          product={{
            id: 1,
            title: "Test Product",
            price: 19.99,
            thumbnail: "https://example.com/test.jpg",
            description: "Test description",
            images: [],
            category: "beauty",
            brand: "Test Brand",
            stock: 10,
            rating: 4.5,
            discountPercentage: 12.5,
          }}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();

    const links = screen.getAllByRole("link", { name: "Test Product" });

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/products/1");
    expect(links[1]).toHaveAttribute("href", "/products/1");
  });
});