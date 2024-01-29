import { pathname } from "~/configs/path";
import { lazy } from "react";

const ProductPage = lazy(() => import("~/pages/ProductPage"));

export const publicRoutes = [
  { path: pathname.product, component: ProductPage, layout: null },
];
