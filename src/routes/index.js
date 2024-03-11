import { pathname } from "~/configs/path";
import { lazy } from "react";
const UploadProduct = lazy(() => import("~/pages/UpLoadProduct"));

const UserProfilePage = lazy(() => import("~/pages/UserProfilePage"));
const ProductPage = lazy(() => import("~/pages/ProductPage"));
const HomePage = lazy(() => import("~/pages/HomePage"));
const CartPage = lazy(() => import("~/pages/CartPage"));
const CheckOutPage = lazy(() => import("~/pages/CheckOutPage"));
const DetailProductPage = lazy(() => import("~/pages/DetailProductPage"));
const PolicyPage = lazy(() => import("~/pages/PolicyPage"));
const PageLogin = lazy(() => import("~/pages/PageLogin"));
const PageSignUp = lazy(() => import("~/pages/PageSignUp"));
const PageForgetAccount = lazy(() => import("~/pages/PageForgetAccount"));
const PageChangePassword = lazy(() => import("~/pages/PageChangePassword"));
const PageContacts = lazy(() => import("~/pages/PageContacts"));
const ShopProductPage = lazy(() => import("~/pages/ShopProductPage"));

export const publicRoutes = [
  { path: pathname.product, component: ProductPage, layout: null },
  { path: pathname.home, component: HomePage, layout: null },
  { path: pathname.cart, component: CartPage, layout: null },
  { path: pathname.checkout, component: CheckOutPage, layout: null },
  { path: pathname.policy, component: PolicyPage, layout: null },
  { path: pathname.login, component: PageLogin, layout: null },
  { path: pathname.signup, component: PageSignUp, layout: null },
  { path: pathname.forgetAccount, component: PageForgetAccount, layout: null },
  { path: pathname.productDetail, component: DetailProductPage, layout: null },
  { path: pathname.account, component: UserProfilePage, layout: null },
  {
    path: pathname.changePassword,
    component: PageChangePassword,
    layout: null,
  },
  { path: pathname.contacts, component: PageContacts, layout: null },
  { path: pathname.shop, component: ShopProductPage, layout: null },
  { path: pathname.addproduct, component: UploadProduct, layout: null },
];
