import { createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
    brands: [],
    loading: false,
    error: "",
};

export const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {
        fetchBrandRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        fetchBrandSuccess: (state, action) => {
            const { brands } = action.payload;
            state.brands = brands;
            state.loading = false;
            state.error = "";
        },
        fetchBrandFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { fetchBrandFailed, fetchBrandRequest, fetchBrandSuccess } = brandSlice.actions;

export default brandSlice.reducer;
