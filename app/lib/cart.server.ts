import { createCookie } from "react-router";
import type { CartItem } from "./types";

const cartCookie = createCookie("ltp-cart", {
  path: "/",
  httpOnly: true,
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7,
});

export async function getCart(request: Request): Promise<CartItem[]> {
  const cookieHeader = request.headers.get("Cookie");
  const cart = (await cartCookie.parse(cookieHeader)) || [];
  return Array.isArray(cart) ? cart : [];
}

export async function commitCart(cart: CartItem[]) {
  return await cartCookie.serialize(cart);
}

export function addItemToCart(cart: CartItem[], productId: number) {
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    return cart.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }

  return [...cart, { productId, quantity: 1 }];
}

export function removeItemFromCart(cart: CartItem[], productId: number) {
  return cart.filter((item) => item.productId !== productId);
}

export function getCartCount(cart: CartItem[]) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}