import { pathname } from "~/configs/path";
import styles from "~/styles/SignUp.module.scss";
import classNames from "classnames/bind";
import { Container, Form } from "react-bootstrap";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import fb_login from "~/assets/imgs/login_facebook.png";
import gg_login from "~/assets/imgs/login_google.png";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useState } from "react";
import { registerApi } from "~/api-server";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

export default function SignUp() {
    const { search } = useLocation();
    const redirect = new URLSearchParams(search).get("redirect") || pathname.home;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        phoneNumber: "",
        email: "",
        password: "",
        gender: null,
        role: null,
    });

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!formData.phoneNumber.trim()) {
            validationErrors.phoneNumber = "Số điện thoại không được để trống!";
        } else if (!/^\d{10,11}$/.test(formData.phoneNumber.trim())) {
            validationErrors.phoneNumber = "Số điện thoại không hợp lệ!";
        }

        if (!formData.email.trim()) {
            validationErrors.email = "Email không được để trống!";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            validationErrors.email = "Email không đúng định dạng!";
        }

        if (!formData.password.trim()) {
            validationErrors.password = "Mật khẩu không được để trống!";
        } else if (formData.password.length < 8) {
            validationErrors.password = "Mật khẩu phải có ít nhất 8 ký tự!";
        } else if (formData.password.length > 256) {
            validationErrors.password = "Mật khẩu không được quá 256 ký tự!";
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            await registerApi(dispatch, formData, navigate, redirect);
        }
    };

    return (
        <div>
            <BreadCrumbs
                hrefs={[
                    { path: pathname.home, name: "Trang chủ", isCurrent: false },
                    { path: pathname.login, name: "Đăng ký tài khoản", isCurrent: true },
                ]}
            />
            <Container>
                <div className={cx("form__login")}>
                    <div className={cx("signup")}>
                        <div className={cx("signup__text")}>
                            <h3 className={cx("signup__textheading")}>ĐĂNG KÝ TÀI KHOẢN</h3>
                            <h6 className={cx("signup__textcontent")}>
                                Bạn đã có tài khoản ? Đăng nhập&nbsp;
                                <Link to={pathname.login}>tại đây</Link>
                            </h6>
                        </div>
                        <div>
                            <Form onSubmit={handleSubmit} className={cx("signup-form ")}>
                                <p
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignContent: "center",
                                    }}>
                                    THÔNG TIN CÁ NHÂN
                                </p>
                                <div className={cx("signup-form__group")}>
                                    <label htmlFor="email" className={cx("signup-form__label")}>
                                        Email <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        className={cx("signup-form__input")}
                                        id="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    {errors.email && <span className={cx("error-msg")}>{errors.email}</span>}
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
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    {errors.password && <span className={cx("error-msg")}>{errors.password}</span>}
                                </div>
                                <div className={cx("signup-form__group")}>
                                    <label htmlFor="phonenumber" className={cx("signup-form__label")}>
                                        Số điện thoại <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phonenumber"
                                        className={cx("signup-form__input")}
                                        id="phonenumber"
                                        placeholder="Số điện thoại"
                                        value={formData.phoneNumber}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                phoneNumber: e.target.value,
                                            })
                                        }
                                    />
                                    {errors.phoneNumber && (
                                        <span className={cx("error-msg")}>{errors.phoneNumber}</span>
                                    )}
                                </div>
                                <div className={cx("signup-form__group")}>
                                    <label htmlFor="" className={cx("signup-form__label")}>
                                        Vai Trò <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <select
                                        className={cx("select__role")}
                                        name=""
                                        id=""
                                        style={{ display: "block" }}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                                        <option selected disabled>
                                            Vai trò
                                        </option>
                                        <option value="customer">Customer</option>
                                        <option value="provider">Provider</option>
                                    </select>
                                </div>
                                <div className={cx("signup-form__group")}>
                                    <label htmlFor="" className={cx("signup-form__label")}>
                                        Giới tính <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <select
                                        className={cx("select__role")}
                                        name=""
                                        id=""
                                        style={{ display: "block" }}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                                        <option selected disabled>
                                            Giới tính
                                        </option>
                                        <option value={0}>Nam</option>
                                        <option value={1}>Nữ</option>
                                        <option value={2}>Khác</option>
                                    </select>
                                    <br />
                                    <button className={cx("signup-form__submit")} type="submit">
                                        ĐĂNG KÝ
                                    </button>
                                    <p className={cx("text-content-secondary")}>Hoặc đăng nhập bằng</p>
                                    <div className={cx("signup-form__social")}>
                                        <div className={cx("signup-form__social-item")}>
                                            <Link to="/">
                                                <Image
                                                    src={fb_login}
                                                    alt="Facebook Login"
                                                    className={cx("signup-form__social-item")}
                                                />
                                            </Link>
                                        </div>
                                        <div className={cx("signup-form__social-item")}>
                                            <Link to="/">
                                                <Image
                                                    src={gg_login}
                                                    alt="Google Login"
                                                    className={cx("signup-form__social-item")}
                                                />
                                            </Link>
                                        </div>
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
