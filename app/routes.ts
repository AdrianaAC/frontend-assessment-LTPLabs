import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("shop", "routes/shop.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("blog", "routes/blog.tsx"),
  route("deals", "routes/deals.tsx"),
  route("account", "routes/account.tsx"),
  route("products/:productId", "routes/product-detail.tsx"),
  route("cart", "routes/cart.tsx"),
] satisfies RouteConfig;