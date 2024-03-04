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

    clearCartItems: (state) => {
      state.cartItems = [];
      state.pages = 0;
      state.page = 0;
      state.loading = false;
    },

    uploadToCartRequest: (state) => {
      state.loading = true;
      state.error = "";
    },

    uploadToCartSuccess: (state, action) => {
      const { data } = action.payload;
      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i]._id === data._id) {
          state.cartItems[i].amount = data.amount;
        }
      }
      state.loading = false;
    },

    uploadToCartFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteToCartItemRequest: (state) => {
      state.loading = true;
      state.error = "";
    },
    deleteToCartItemSuccess: (state, action) => {
      const { data } = action.payload;
      const newCart = state.cartItems.filter((item) => {
        console.log(item._id, data._id);
        return item._id != data._id;
      });
      state.cartItems = newCart;
      state.loading = false;
    },
    deleteToCartItemFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchCartItemRequest,
  fetchCartItemSuccess,
  fetchCartItemFail,
  clearCartItems,
  uploadToCartFailed,
  uploadToCartRequest,
  uploadToCartSuccess,
  deleteToCartItemRequest,
  deleteToCartItemSuccess,
  deleteToCartItemFail,
} = cartSlice.actions;

export default cartSlice.reducer;
