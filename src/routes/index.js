import { pathname } from "~/configs/path";
import { lazy } from "react";

const ProductPage = lazy(() => import("~/pages/ProductPage"));
const CartPage = lazy(() => import("~/pages/CartPage"));
const HomePage = lazy(() => import("~/pages/HomePage"));
const CheckOutPage = lazy(() => import("~/pages/CheckOutPage"));

export const publicRoutes = [
  { path: pathname.product, component: ProductPage, layout: null },
  { path: pathname.cart, component: CartPage, layout: null },
  { path: pathname.home, component: HomePage, layout: null },
  { path: pathname.checkout, component: CheckOutPage, layout: null },
];
