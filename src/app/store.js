import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";

// reducers
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlide";
import listProductReducer from "./slices/listProductSlice";
import brandReducer from "./slices/brandSlice";
import categorySlice from "./slices/categorySlice";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

// add vào đây nếu muốn state lưu vào local storage
const reducerNeededCombine = { cart: cartReducer, brand: brandReducer, category: categorySlice };

const persistedReducer = persistCombineReducers(persistConfig, reducerNeededCombine);

const rootReducer = combineReducers({
    persist: persistedReducer,
    product: productReducer,
    listProduct: listProductReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
