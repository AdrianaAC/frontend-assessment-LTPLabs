import { createCookie } from "react-router";

export type CartItem = {
  productId: number;
  quantity: number;
};

const cartCookie = createCookie("ltp-cart", {
  path: "/",
  httpOnly: true,
  sameSite: "lax",
  secure: false,
});

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

function sanitizeQuantity(value: unknown) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return MIN_QUANTITY;
  }

  return Math.max(MIN_QUANTITY, Math.min(MAX_QUANTITY, Math.trunc(numeric)));
}

function sanitizeCart(cart: unknown): CartItem[] {
  if (!Array.isArray(cart)) {
    return [];
  }

  return cart
    .map((item) => {
      if (
        typeof item !== "object" ||
        item === null ||
        !("productId" in item) ||
        !("quantity" in item)
      ) {
        return null;
      }

      const productId = Number((item as CartItem).productId);

      if (!Number.isFinite(productId)) {
        return null;
      }

      return {
        productId,
        quantity: sanitizeQuantity((item as CartItem).quantity),
      };
    })
    .filter(Boolean) as CartItem[];
}

export async function getCart(request: Request): Promise<CartItem[]> {
  const cookieHeader = request.headers.get("Cookie");
  const cookieValue = await cartCookie.parse(cookieHeader);
  return sanitizeCart(cookieValue);
}

export async function commitCart(cart: CartItem[]) {
  return cartCookie.serialize(sanitizeCart(cart));
}

export function getCartCount(cart: CartItem[]) {
  return sanitizeCart(cart).reduce((sum, item) => sum + item.quantity, 0);
}

export function addItemToCart(cart: CartItem[], productId: number) {
  const normalizedCart = sanitizeCart(cart);
  const existingItem = normalizedCart.find((item) => item.productId === productId);

  if (existingItem) {
    return normalizedCart.map((item) =>
      item.productId === productId
        ? {
            ...item,
            quantity: Math.min(MAX_QUANTITY, item.quantity + 1),
          }
        : item,
    );
  }

  return [
    ...normalizedCart,
    {
      productId,
      quantity: 1,
    },
  ];
}

export function removeItemFromCart(cart: CartItem[], productId: number) {
  return sanitizeCart(cart).filter((item) => item.productId !== productId);
}

export function updateItemQuantity(
  cart: CartItem[],
  productId: number,
  delta: number,
) {
  return sanitizeCart(cart).map((item) => {
    if (item.productId !== productId) {
      return item;
    }

    return {
      ...item,
      quantity: Math.max(
        MIN_QUANTITY,
        Math.min(MAX_QUANTITY, item.quantity + delta),
      ),
    };
  });
}