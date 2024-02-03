import { pathname } from "~/configs/path";
import { lazy } from "react";

const ProductPage = lazy(() => import("~/pages/ProductPage"));
const HomePage = lazy(() => import("~/pages/Home"));

export const publicRoutes = [
  { path: pathname.product, component: ProductPage, layout: null },
  { pat: pathname.home, component: HomePage, layout: null },
];
