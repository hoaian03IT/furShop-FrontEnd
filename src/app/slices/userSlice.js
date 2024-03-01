import { createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
    userInfo: {},
    token: "",
    isLogged: false,
    loading: false,
    error: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        loginSuccess: (state, action) => {
            const { user, token } = action.payload;
            if (user?._id) {
                state.userInfo = user;
                state.token = token;
                state.isLogged = true;
            }
            state.loading = false;
        },
        loginFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        registerRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        registerSuccess: (state, action) => {
            const { user, token } = action.payload;
            if (user?._id) {
                state.userInfo = user;
                state.token = token;
                state.isLogged = true;
            }
            state.loading = false;
        },
        registerFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        logoutRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        logoutSuccess: (state) => {
            state.loading = false;
            state.userInfo = {};
            state.token = "";
            state.isLogged = false;
        },
        logoutFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    loginFailed,
    loginRequest,
    loginSuccess,
    logoutFailed,
    logoutRequest,
    logoutSuccess,
    registerFailed,
    registerRequest,
    registerSuccess,
} = userSlice.actions;

export default userSlice.reducer;
