import { createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
    products: [],
    loading: false,
    error: "",
};

export const listProductSlice = createSlice({
    name: "listProduct",
    initialState,
    reducers: {
        fetchListProductRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        fetchListProductSuccess: (state, action) => {
            if (action.payload.length > 0) state.products = action.payload;
            state.loading = false;
        },
        fetchListProductFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { fetchListProductFailed, fetchListProductRequest, fetchListProductSuccess } = listProductSlice.actions;

export default listProductSlice.reducer;
