import { pathname } from "~/configs/path";
import styles from "~/styles/Login.scss";
import classNames from "classnames/bind";
import { Container, Form } from "react-bootstrap";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import fb_login from "~/assets/imgs/login_facebook.png";
import gg_login from "~/assets/imgs/login_google.png";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useState } from "react";
import { loginApi } from "~/api-server";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "~/components/Loading";
import { useLocation, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

export default function Login() {
    const { search } = useLocation();
    const redirect = new URLSearchParams(search).get("redirect") || pathname.home;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.persist.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!formData.username.trim()) {
            validationErrors.username = "Tên đăng nhập không được để trống !";
        }

        if (!formData.password.trim()) {
            validationErrors.password = "Mật khẩu không được để trống.";
        } else if (formData.password.length < 8) {
            validationErrors.password = "Mật khẩu phải có ít nhất 8 kí tự.";
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                await loginApi(dispatch, { ...formData }, navigate, redirect);
            } catch (error) {}
        }
    };

    return (
        <div>
            <BreadCrumbs
                hrefs={[
                    { path: pathname.home, name: "Trang chủ", isCurrent: false },
                    { path: pathname.login, name: "Đăng nhập", isCurrent: true },
                ]}
            />
            <Container>
                <div className={cx("form__login")}>
                    <div className={cx("signup")}>
                        <div className={cx("signup__text")}>
                            <h3 className={cx("signup__textheading")}>ĐĂNG NHẬP TÀI KHOẢN</h3>
                            <h6 className={cx("signup__textcontent")}>
                                Bạn chưa có tài khoản?&nbsp; <Link to={pathname.signup}>Đăng ký tại đây</Link>
                            </h6>
                        </div>
                        <div className={cx("signup-form ")}>
                            <Form onSubmit={handleSubmit}>
                                <div className={cx("signup-form__group")}>
                                    <label htmlFor="username" className={cx("signup-form__label")}>
                                        Tên đăng nhập <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        className={cx("signup-form__input")}
                                        id="username"
                                        placeholder="Tên đăng nhập"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    />
                                    {errors.username && <span className={cx("error-msg")}>{errors.username}</span>}
                                </div>
                                <div className={cx("signup-form__group")}>
                                    <label htmlFor="password" className={cx("signup-form__label")}>
                                        Mật khẩu <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className={cx("signup-form__input")}
                                        id="password"
                                        placeholder="Mật khẩu"
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    {errors.password && <span className={cx("error-msg")}>{errors.password}</span>}
                                </div>
                                <div className={cx("signup-form__forget")}>
                                    <p>
                                        Quên mật khẩu ? Nhấn vào <Link to={pathname.forgetAccount}>đây</Link>
                                    </p>
                                </div>
                                <button className={cx("signup-form__submit")} type="submit">
                                    {loading ? <Loading /> : <span>ĐĂNG NHẬP</span>}
                                </button>
                                <p className={cx("text-content-secondary")}>Hoặc đăng nhập bằng</p>
                                <div className="signup-form__social">
                                    <div className="signup-form__social-item">
                                        <Link to="/">
                                            <Image
                                                className={cx("signup-form__social-item")}
                                                src={fb_login}
                                                alt="Facebook Login"
                                            />
                                        </Link>
                                    </div>
                                    <div className="signup-form__social-item">
                                        <Link to="/">
                                            <Image
                                                className={cx("signup-form__social-item")}
                                                src={gg_login}
                                                alt="Google Login"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
