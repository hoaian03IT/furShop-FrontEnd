import { createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  cartItems: [],
  pages: 0,
  page: 0,
  loading: false,
  error: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchCartItemRequest: (state) => {
      state.loading = true;
      state.error = "";
    },
    fetchCartItemSuccess: (state, action) => {
      const { data, numberPage, currentPage } = action.payload;
      state.cartItems = data;
      state.pages = numberPage;
      state.page = currentPage;
      state.loading = false;
    },
    fetchCartItemFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchCartItemRequest, fetchCartItemSuccess, fetchCartItemFail } =
  cartSlice.actions;

export default cartSlice.reducer;
