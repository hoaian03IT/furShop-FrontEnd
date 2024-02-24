import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: {},
    loading: false,
    error: "",
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        fetchProductRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        fetchProductSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = "";
        },
        fetchProductFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { fetchProductFailed, fetchProductRequest, fetchProductSuccess } = productSlice.actions;

export default productSlice.reducer;
