import { pathname } from "~/configs/path";
import styles from "~/styles/ChangePassword.module.scss";
import classNames from "classnames/bind";
import { Container, Form, Row, Col } from "react-bootstrap";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { axiosInterceptor } from "~/utils/axiosInterceptor";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

export default function Login() {
    const { user } = useSelector((state) => state.persist);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { search } = useLocation();
    const [check, setCheck] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        newpassword: "",
        confirmpassword: "",
    });

    const [errors, setErrors] = useState({});

    const axiosJWT = axiosInterceptor(user, dispatch, navigate);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!formData.password.trim()) {
            validationErrors.password = "Mật khẩu không được để trống.";
        } else if (formData.password.length < 0) {
            validationErrors.password = "Mật khẩu phải có ít nhất 8 kí tự.";
        }

        if (!formData.newpassword.trim()) {
            validationErrors.newpassword = "Mật khẩu mới không được để trống.";
        } else if (formData.newpassword.length < 0) {
            validationErrors.password = "Mật khẩu mới phải có ít nhất 8 kí tự.";
        } else if (formData.password === formData.newpassword) {
            validationErrors.newpassword = "Mật khẩu mới không được trùng mật khẩu cũ";
        }
        if (!formData.confirmpassword.trim()) {
            validationErrors.confirmpassword = "Xác nhận mật khẩu không được để trống.";
        } else if (formData.confirmpassword.length < 0) {
            validationErrors.confirmpassword = "Mật khẩu phải có ít nhất 8 kí tự.";
        } else if (formData.newpassword !== formData.confirmpassword) {
            validationErrors.confirmpassword = "Xác nhận mật khẩu không trùng khớp";
        }

        setErrors({ ...validationErrors });

        if (Object.keys(validationErrors).length === 0) {
            try {
                // const token =
                const response = await axiosJWT.post("http://localhost:3333/api/tai-khoan/auth/doi-mat-khau", {
                    password: formData.password,
                    newPassword: formData.newpassword,
                });
                toast.success(response.data.message);
                navigate("/");
            } catch (error) {
                console.error("Error:", error);
                toast.error("Đã xảy ra lỗi khi đổi mật khẩu");
            }
        }
    };
    return (
        <div>
            <BreadCrumbs
                hrefs={[
                    { path: pathname.home, name: "Trang chủ", isCurrent: false },
                    { path: pathname.login, name: "Đổi mật khẩu", isCurrent: true },
                ]}
            />
            <Container>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <div className={cx("form__login")}>
                            <div className={cx("signup")}>
                                <div className={cx("signup__text")}>
                                    <h3 className={cx("signup__textheading")}>ĐỔI MẬT KHẨU</h3>
                                    <h6 className={cx("signup__textcontent")}>
                                        Để đảm bảo tính bảo mật vui lòng đặt mật khẩu với ít nhất 8 kí tự
                                    </h6>
                                </div>
                                <div className={cx("signup-form ")}>
                                    <Form onSubmit={handleSubmit}>
                                        <div className={cx("signup-form__group")}>
                                            <label htmlFor="password" className={cx("signup-form__label")}>
                                                Mật khẩu cũ <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <input
                                                type="password"
                                                name="oldpassword"
                                                className={cx("signup-form__input")}
                                                id="oldpassword"
                                                placeholder="Mật khẩu"
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            />
                                            {errors.password && (
                                                <span className={cx("error-msg")}>{errors.password}</span>
                                            )}
                                        </div>
                                        <div className={cx("signup-form__group")}>
                                            <label htmlFor="password" className={cx("signup-form__label")}>
                                                Mật khẩu mới <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <input
                                                type="password"
                                                name="newpassword"
                                                className={cx("signup-form__input")}
                                                id="newpassword"
                                                placeholder="Mật khẩu mới"
                                                onChange={(e) =>
                                                    setFormData({ ...formData, newpassword: e.target.value })
                                                }
                                            />
                                            {errors.newpassword && (
                                                <span className={cx("error-msg")}>{errors.newpassword}</span>
                                            )}
                                        </div>
                                        <div className={cx("signup-form__group")}>
                                            <label htmlFor="password" className={cx("signup-form__label")}>
                                                Xác nhận lại mật khẩu <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <input
                                                type="password"
                                                name="confirmpassword"
                                                className={cx("signup-form__input")}
                                                id="confirmpassword"
                                                placeholder="Xác nhận mật khẩu"
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        confirmpassword: e.target.value,
                                                    })
                                                }
                                            />
                                            {errors.confirmpassword && (
                                                <span className={cx("error-msg")}>{errors.confirmpassword}</span>
                                            )}
                                        </div>

                                        <div className={cx("signup-form__forget")}>
                                            <p>
                                                Quên mật khẩu ? Nhấn vào <Link to={pathname.forgetAccount}>đây</Link>
                                            </p>
                                        </div>
                                        <button className={cx("signup-form__submit", "w-100")} type="submit">
                                            ĐỔI MẬT KHẨU
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
