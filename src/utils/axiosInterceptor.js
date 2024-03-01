import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshTokenApi } from "~/api-server";
import { loginSuccess } from "~/app/slices/userSlice";

function axiosInterceptor(user, dispatch, navigate) {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(
        async (config) => {
            let currentToken = user.token;
            const { exp } = jwtDecode(currentToken);

            if (exp < new Date().getTime() / 1000) {
                try {
                    const { token: newToken } = await refreshTokenApi(user.userInfo._id, navigate);
                    currentToken = newToken;

                    dispatch(loginSuccess({ ...user, token: currentToken }));
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
