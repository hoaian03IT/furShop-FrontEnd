import axios from "axios";
import { fetchBrandFailed, fetchBrandRequest, fetchBrandSuccess } from "~/app/slices/brandSlice";
import { fetchCategoriesFailed, fetchCategoriesRequest, fetchCategoriesSuccess } from "~/app/slices/categorySlice";
import {
    fetchListProductFailed,
    fetchListProductRequest,
    fetchListProductSuccess,
} from "~/app/slices/listProductSlice";
import { fetchProductFailed, fetchProductRequest, fetchProductSuccess } from "~/app/slices/productSlice";

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
