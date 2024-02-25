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
            const product = action.payload;
            let isExisted = false;

            const attributeProduct = product.attributes[0];

            let newCartItems;

            newCartItems = state.cartItems.map((item) => {
                if (item.attributes[0]?._id === attributeProduct?._id) {
                    const attr = item.attributes[0];
                    attr.quantity += attributeProduct?.quantity;
                    isExisted = true;
                    return { ...item, attributes: [attr] };
                } else {
                    return { ...item };
                }
            });

            if (!isExisted) {
                newCartItems.push(product);
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

            const attributeProduct = removedProduct.attributes[0];

            let newCart = state.cartItems.map((item) => {
                const attributeItem = item.attributes[0];
                if (attributeItem?.id === attributeProduct?._id) {
                    const remain = attributeItem?.quantity - attributeProduct?.quantity;
                    if (remain <= 0) {
                        return { ...item, attributes: [{ ...attributeItem, quantity: 1 }] };
                    } else {
                        return { ...item, attributes: [{ ...attributeItem, quantity: remain }] };
                    }
                } else {
                    return { ...item };
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
