import axios from "axios";
import { AiOutlineSafety } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  fetchBrandFailed,
  fetchBrandRequest,
  fetchBrandSuccess,
} from "~/app/slices/brandSlice";
import { fetchCartItemRequest } from "~/app/slices/cartSlide";
import {
  fetchCategoriesFailed,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
} from "~/app/slices/categorySlice";
import {
  fetchListProductFailed,
  fetchListProductRequest,
  fetchListProductSuccess,
} from "~/app/slices/listProductSlice";
import {
  fetchProductFailed,
  fetchProductRequest,
  fetchProductSuccess,
} from "~/app/slices/productSlice";
import {
  loginFailed,
  loginRequest,
  loginSuccess,
  registerFailed,
  registerRequest,
  registerSuccess,
} from "~/app/slices/userSlice";

axios.defaults.baseURL = `http://localhost:${
  process.env.REACT_APP_SERVER_POST || 8080
}`;

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
    dispatch(
      fetchListProductFailed(error.message || error.response?.data.message)
    );
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
    dispatch(
      fetchCategoriesFailed(error.message || error.response?.data.message)
    );
  }
};

export const loginApi = async (dispatch, payload, navigate, redirect) => {
  dispatch(loginRequest());
  const { email, password } = payload;
  try {
    const res = await axios.post(
      "/api/tai-khoan/dang-nhap",
      { email, password },
      payload
    );
    dispatch(loginSuccess(res.data));
    navigate(redirect);
  } catch (error) {
    const errMsg = error.response?.data.message || error.message;
    toast.error(errMsg);
    dispatch(loginFailed(errMsg));
  }
};

export const registerApi = async (dispatch, payload = {}) => {
  dispatch(registerRequest());
  const { email, username, password, role, gender } = payload;
  try {
    const res = await axios.post(
      "/api/tai-khoan/dang-ky",
      { email, username, password, role, gender },
      { withCredentials: true }
    );
    dispatch(registerSuccess(res.data));
  } catch (error) {
    const errMsg = error.response?.data.message || error.message;
    toast.error(errMsg);
    dispatch(registerFailed(errMsg));
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
