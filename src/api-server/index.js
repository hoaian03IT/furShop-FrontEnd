import axios from "axios";
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
