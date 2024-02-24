import { pathname } from "~/configs/path";
import { lazy } from "react";

const ProductPage = lazy(() => import("~/pages/ProductPage"));
const HomePage = lazy(() => import("~/pages/HomePage"));
const CartPage = lazy(() => import("~/pages/CartPage"));
const CheckOutPage = lazy(() => import("~/pages/CheckOutPage"));
const DetailProductPage = lazy(() => import("~/pages/DetailProductPage"));
const PolicyPage = lazy(() => import("~/pages/PolicyPage"));
const PageLogin = lazy(() => import("~/pages/PageLogin"));
const PageSignUp = lazy(() => import("~/pages/PageSignUp"));
const PageForgetAccount = lazy(() => import("~/pages/PageForgetAccount"));

export const publicRoutes = [
  { path: pathname.product, component: ProductPage, layout: null },
  { path: pathname.home, component: HomePage, layout: null },
  { path: pathname.cart, component: CartPage, layout: null },
  { path: pathname.checkout, component: CheckOutPage, layout: null },
  { path: pathname.policy, component: PolicyPage, layout: null },
  { path: pathname.login, component: PageLogin, layout: null },
  { path: pathname.signup, component: PageSignUp, layout: null },
  { path: pathname.forgetaccount, component: PageForgetAccount, layout: null },
  { path: pathname.productDetail, component: DetailProductPage, layout: null },
];
