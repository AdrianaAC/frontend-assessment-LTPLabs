import {
  addItemToCart,
  getCartCount,
  removeItemFromCart,
  updateItemQuantity,
} from "./cart.server";

describe("cart.server", () => {
  it("adds a new item to the cart", () => {
    const cart = addItemToCart([], 5);

    expect(cart).toEqual([{ productId: 5, quantity: 1 }]);
  });

  it("increments quantity when adding an existing item", () => {
    const cart = addItemToCart([{ productId: 5, quantity: 1 }], 5);

    expect(cart).toEqual([{ productId: 5, quantity: 2 }]);
  });

  it("removes an item from the cart", () => {
    const cart = removeItemFromCart(
      [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
      ],
      1,
    );

    expect(cart).toEqual([{ productId: 2, quantity: 1 }]);
  });

  it("updates quantity but never below 1", () => {
    const cart = updateItemQuantity([{ productId: 1, quantity: 1 }], 1, -1);

    expect(cart).toEqual([{ productId: 1, quantity: 1 }]);
  });

  it("returns the correct cart count", () => {
    const count = getCartCount([
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ]);

    expect(count).toBe(5);
  });
});