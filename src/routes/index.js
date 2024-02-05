import { pathname } from "~/configs/path";
import { lazy } from "react";

const ProductPage = lazy(() => import("~/pages/ProductPage"));
<<<<<<< HEAD
const CartPage = lazy(() => import("~/pages/CartPage"));
const HomePage = lazy(() => import("~/pages/HomePage"));

export const publicRoutes = [
  { path: pathname.product, component: ProductPage, layout: null },
  { path: pathname.cart, component: CartPage, layout: null },
  { path: pathname.home, component: HomePage, layout: null },
=======
const HomePage = lazy(() => import("~/pages/Home"));

export const publicRoutes = [
  { path: pathname.product, component: ProductPage, layout: null },
  { pat: pathname.home, component: HomePage, layout: null },
>>>>>>> ffc3ca59e1585fdd9dc5d96f21e1d9ad99a49502
];
