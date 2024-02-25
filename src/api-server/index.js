import axios from "axios";
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
        const res = await axios.get(`/san-pham/${id}`);
        dispatch(fetchProductSuccess(res.data));
    } catch (error) {
        dispatch(fetchProductFailed(error.message || error.response?.data.message));
    }
};

export const fetchListProductApi = async (query, dispatch) => {
    try {
        dispatch(fetchListProductRequest());
        const res = await axios.get(`/san-pham/loc-san-pham?${query}`);
        dispatch(fetchListProductSuccess(res.data.products));
    } catch (error) {
        dispatch(fetchListProductFailed(error.message || error.response?.data.message));
    }
};
