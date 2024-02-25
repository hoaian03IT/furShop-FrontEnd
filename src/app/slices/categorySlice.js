import { createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
    categories: [],
    loading: false,
    error: "",
};

export const brandSlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        fetchCategoriesRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        fetchCategoriesSuccess: (state, action) => {
            const { categories } = action.payload;
            state.categories = categories;
            state.loading = false;
            state.error = "";
        },
        fetchCategoriesFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { fetchCategoriesFailed, fetchCategoriesRequest, fetchCategoriesSuccess } = brandSlice.actions;

export default brandSlice.reducer;
