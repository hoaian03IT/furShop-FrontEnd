import { createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
    cartItems: [],
    loading: false,
    error: "",
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCartRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        addProductToCartSuccess: (state, action) => {
            const addedProduct = action.payload;
            let isExisted = false;

            const newCartItems = state.cartItems.map((item) => {
                if (item.attributes[0]?._id === addedProduct.attributes[0]._id) {
                    const attr = item.attributes[0];
                    attr.quantity += addedProduct.attributes[0].quantity;
                    isExisted = true;
                    return { ...item, attributes: attr };
                } else {
                    return { ...item };
                }
            });

            if (!isExisted) {
                newCartItems.push(addedProduct);
            }

            // update cart
            state.cartItems = newCartItems;
            state.loading = false;
        },
        addProductToCartFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        removeProductFromCartRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        removeProductFromCartSuccess: (state, action) => {
            const removedProduct = action.payload;

            const newCart = state.cartItems.map((product) => {
                if (product.id === removedProduct._id) {
                    if (product.quantity === 1) {
                        return {};
                    } else {
                        return { ...product, quantity: product.quantity - removedProduct.quantity };
                    }
                } else {
                    return {};
                }
            });

            // update cart
            state.cartItems = newCart;
            state.loading = false;
        },
        removeProductFromCartFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addProductToCartFailed,
    addProductToCartRequest,
    addProductToCartSuccess,
    removeProductFromCartFailed,
    removeProductFromCartRequest,
    removeProductFromCartSuccess,
} = cartSlice.actions;

export default cartSlice.reducer;
