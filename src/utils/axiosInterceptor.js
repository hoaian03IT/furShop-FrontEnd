import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshTokenApi } from "~/api-server";
import { loginSuccess } from "~/app/slices/userSlice";
import { pathname } from "~/configs/path";

function axiosInterceptor(user, dispatch, navigate) {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(
        async (config) => {
            let currentToken = user.token;
            if (!currentToken) navigate(pathname.login);
            const { exp } = jwtDecode(currentToken);

            if (exp < new Date().getTime() / 1000) {
                try {
                    const { token: newToken } = await refreshTokenApi(user.userInfo._id, navigate);
                    currentToken = newToken;

                    dispatch(loginSuccess({ user: user.userInfo, token: currentToken }));
                } catch (error) {
                    localStorage.removeItem("persist:root");
                }
            }
            config.headers.Authorization = "Bearer " + currentToken;
            return config;
        },
        (err) => {
            console.log(err);
        }
    );
    return axiosInstance;
}

export { axiosInterceptor };
