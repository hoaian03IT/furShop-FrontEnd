import axios from "axios";
import { toast } from "react-toastify";
<<<<<<< HEAD

import {
  fetchBrandFailed,
  fetchBrandRequest,
  fetchBrandSuccess,
} from "~/app/slices/brandSlice";
import {
  fetchCartItemRequest,
  fetchCartItemSuccess,
  fetchCartItemFail,
  clearCartItems,
  addToCartRequest,
  addToCartSuccess,
  addToCartFailed,
  uploadToCartRequest,
  uploadToCartSuccess,
  uploadToCartFailed,
  deleteToCartItemRequest,
  deleteToCartItemSuccess,
  deleteToCartItemFail,
=======
import { fetchBrandFailed, fetchBrandRequest, fetchBrandSuccess } from "~/app/slices/brandSlice";

import {
    fetchCartItemRequest,
    fetchCartItemSuccess,
    fetchCartItemFail,
    clearCartItems,
    addToCartRequest,
    addToCartSuccess,
    addToCartFailed,
    uploadToCartRequest,
    uploadToCartSuccess,
    uploadToCartFailed,
    deleteToCartItemRequest,
    deleteToCartItemSuccess,
    deleteToCartItemFail,
>>>>>>> 1559ba1a70603d8dbd162984a1b961400eb2e3cf
} from "~/app/slices/cartSlide";
import { fetchCategoriesFailed, fetchCategoriesRequest, fetchCategoriesSuccess } from "~/app/slices/categorySlice";
import {
    fetchListProductFailed,
    fetchListProductRequest,
    fetchListProductSuccess,
} from "~/app/slices/listProductSlice";
import { fetchProductFailed, fetchProductRequest, fetchProductSuccess } from "~/app/slices/productSlice";
import {
    loginFailed,
    loginRequest,
    loginSuccess,
    logoutFailed,
    logoutRequest,
    logoutSuccess,
    registerFailed,
    registerRequest,
    registerSuccess,
    updateProfileFailed,
    updateProfileRequest,
    updateProfileSuccess,
} from "~/app/slices/userSlice";
import { pathname } from "~/configs/path";

axios.defaults.baseURL = `http://localhost:${process.env.REACT_APP_SERVER_POST || 8080}`;

export const fetchProductDetailApi = async (id, dispatch) => {
    try {
        dispatch(fetchProductRequest());
        const res = await axios.get(`/api/san-pham/${id}`);
        dispatch(fetchProductSuccess(res.data));
    } catch (error) {
        dispatch(fetchProductFailed(error.message || error.response?.data.message));
    }
};

export const fetchListProductApi = async (query, dispatch) => {
    dispatch(fetchListProductRequest());
    try {
        const res = await axios.get(`/api/san-pham/loc-san-pham?${query}`);
        dispatch(fetchListProductSuccess(res.data));
    } catch (error) {
        dispatch(fetchListProductFailed(error.message || error.response?.data.message));
    }
};

export const fetchBrandsApi = async (limit, dispatch) => {
    dispatch(fetchBrandRequest());
    try {
        const res = await axios.get(`/api/thuong-hieu/pho-bien?limit=${limit}`);
        dispatch(fetchBrandSuccess(res.data));
    } catch (error) {
        dispatch(fetchBrandFailed(error.message || error.response?.data.message));
    }
};

export const fetchCategoriesApi = async (dispatch) => {
    dispatch(fetchCategoriesRequest());
    try {
        const res = await axios.get("/api/loai-muc/tat-ca");
        dispatch(fetchCategoriesSuccess(res.data));
    } catch (error) {
        dispatch(fetchCategoriesFailed(error.message || error.response?.data.message));
    }
};

export const loginApi = async (dispatch, payload, navigate, redirect) => {
    dispatch(loginRequest());
    const { email, password } = payload;
    try {
        const res = await axios.post("/api/tai-khoan/dang-nhap", { email, password }, { withCredentials: true });
        const { user, token } = res.data;
        dispatch(loginSuccess({ user, token }));
        navigate(redirect);
    } catch (error) {
        const errMsg = error.response?.data.message || error.message;
        toast.error(errMsg);
        dispatch(loginFailed(errMsg));
    }
};

export const registerApi = async (dispatch, payload = {}, navigate, redirect) => {
    dispatch(registerRequest());
    const { email, phoneNumber, password, role, gender } = payload;
    try {
        const res = await axios.post(
            "/api/tai-khoan/dang-ky",
            { email, phone: phoneNumber, password, role, gender },
            { withCredentials: true }
        );
        const { user, token } = res.data;
        dispatch(registerSuccess({ user, token }));
        navigate(redirect);
    } catch (error) {
        const errMsg = error.response?.data.message || error.message;
        toast.error(errMsg);
        dispatch(registerFailed(errMsg));
    }
};

export const logoutApi = async (dispatch, navigate, axiosJWT) => {
    dispatch(logoutRequest());

    try {
        await axiosJWT.post("/api/tai-khoan/auth/dang-xuat", {}, { withCredentials: true });
        dispatch(logoutSuccess());
        dispatch(clearCartItems());
        navigate(pathname.home);
    } catch (error) {
        const errMsg = error.response?.data.message || error.message;
        toast.error(errMsg);
        dispatch(logoutFailed(errMsg));
    }
};

export const uploadProfileApi = async (payload, axiosJWT, dispatch) => {
    dispatch(updateProfileRequest());
    try {
        const { image, username, phone, gender } = payload;
        const res = await axiosJWT.post(
            `/api/tai-khoan/auth/cap-nhat`,
            {
                image,
                username,
                phone,
                gender,
            },
            { withCredentials: true }
        );
        dispatch(updateProfileSuccess(res.data));
    } catch (error) {
        const errMsg = error.response?.data.message || error.message;
        toast.error(errMsg);
        dispatch(updateProfileFailed(errMsg));
    }
};

export const refreshTokenApi = async (userId, navigate) => {
    try {
        const res = await axios.get(`/api/tai-khoan/refresh-token/${userId}`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        alert(error.message || error.response?.data.message);
    }
};

export const fetchCartItemApi = async (dispatch, axiosJWT, limit, pageNumber) => {
    // dispatch(fetchCartItemRequest());
    try {
        const res = await axiosJWT.get(`/api/gio-hang/xem-gio-hang?limit=${limit}&pageNumber=${pageNumber}`);
        dispatch(fetchCartItemSuccess(res.data));
    } catch (error) {
        const errMsg = error.response?.data.message || error.message;
        toast.error(errMsg);
        dispatch(fetchCartItemFail(errMsg));
    }
};

export const fetchCartItemApiAll = async (dispatch, axiosJWT, limit, pageNumber) => {
    // dispatch(fetchCartItemRequest());
    try {
        const res = await axiosJWT.get(`/api/gio-hang/xem-gio-hang?limit=${limit}&pageNumber=${pageNumber}`);
        return res.data;
    } catch (error) {
        const errMsg = error.response?.data.message || error.message;
        toast.error(errMsg);
        dispatch(fetchCartItemFail(errMsg));
    }
};

export const fetchNewProduct = async (dispatch, limit) => {
    dispatch(fetchListProductRequest());
    try {
        const res = await axios.get(`/api/san-pham/loc-san-pham?pageSize=${limit}`);

        dispatch(fetchListProductSuccess(res.data));
    } catch (error) {
        const errMsg = error.response?.data.message || error.message;
        toast.error(errMsg);
        dispatch(fetchListProductFailed(errMsg));
    }
};

export const uploadToCardApi = async (payload, axiosJWT, dispatch) => {
    try {
        const { cartId, amount } = payload;
        const res = await axiosJWT.post(`/api/gio-hang/cap-nhat`, {
            cartId,
            amount,
        });
        dispatch(uploadToCartSuccess({ data: { amount, _id: cartId } }));
    } catch (error) {
        const errMsg = error.response?.data.message || error.message;
        toast.error(errMsg);
        dispatch(uploadToCartFailed(errMsg));
    }
};

export const createOrder = async (payload, axiosJWT, dispatch) => {
    try {
        const res = await axiosJWT.post(`/api/don-hang/dat-hang`, payload);
        dispatch(clearCartItems());
    } catch (error) {
        const errMsg = error.response?.data.message || error.message;
        toast.error(errMsg);
    }
};

export const deleteToCartApi = async (payload, axiosJWT, dispatch) => {
    dispatch(deleteToCartItemRequest());
    try {
        const { cartId } = payload;
        const res = await axiosJWT.delete(`/api/gio-hang/xoa/${cartId}`);
        dispatch(deleteToCartItemSuccess({ data: { _id: cartId } }));
    } catch (error) {
        const errMsg = error.response?.data.message || error.message;
        toast.error(errMsg);
        dispatch(deleteToCartItemFail(errMsg));
    }
};

export const addToCardApi = async (payload, axiosJWT, dispatch) => {
    dispatch(addToCartRequest());
    try {
        const { amount, productId, productAttributes } = payload;
        const res = await axiosJWT.post(`/api/gio-hang/them-vao-gio-hang`, {
            amount,
            productId,
            productAttributes,
        });
        dispatch(addToCartSuccess(res.data));
    } catch (error) {
        const errMsg = error.response?.data.message || error.message;
        toast.error(errMsg);
        dispatch(addToCartFailed(errMsg));
    }
};
