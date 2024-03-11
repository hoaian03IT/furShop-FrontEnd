import { createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  products: [],
  page: null,
  pages: null,
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
      const { products, page, pages } = action.payload;
      state.products = products;
      state.page = page;
      state.pages = pages;
      state.loading = false;
    },
    fetchListProductFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchListProductFailed,
  fetchListProductRequest,
  fetchListProductSuccess,
} = listProductSlice.actions;

export default listProductSlice.reducer;
