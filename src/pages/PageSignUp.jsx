import { pathname } from "~/configs/path";
import styles from "~/styles/SignUp.scss";
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

const cx = classNames.bind(styles);

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
    gender: null,
  });

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.username.trim()) {
      validationErrors.username = "tên tài khoản không được để trống!";
    } else if (formData.username.trim().includes(" ") || !formData.username) {
      validationErrors.username = "tên tài khoản không hợp lệ!";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email không được để trống!";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
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
    const data = await registerApi(dispatch, formData);
    if (Object.keys(validationErrors).length === 0) {
      console.log(data);
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
                  }}
                >
                  THÔNG TIN CÁ NHÂN
                </p>
                <div className={cx("signup-form__group")}>
                  <label
                    htmlFor="phonenumber"
                    className={cx("signup-form__label")}
                  >
                    User name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="phonenumber"
                    className={cx("signup-form__input")}
                    id="phonenumber"
                    placeholder="Tên đăng nhập"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        username: e.target.value,
                      })
                    }
                  />
                  {errors.phoneNumber && (
                    <span className={cx("error-msg")}>
                      {errors.phoneNumber}
                    </span>
                  )}
                </div>
                <div className={cx("signup-form__group")}>
                  <label
                    htmlFor="password"
                    className={cx("signup-form__label")}
                  >
                    Mật khẩu <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className={cx("signup-form__input")}
                    id="password"
                    placeholder="Mật khẩu"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  {errors.password && (
                    <span className={cx("error-msg")}>{errors.password}</span>
                  )}
                </div>
                <div className={cx("signup-form__group")}>
                  <label htmlFor="email" className={cx("signup-form__label")}>
                    Email <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={cx("signup-form__input")}
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <span className={cx("error-msg")}>{errors.email}</span>
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
                    onChange={(e) => {
                      setFormData({ ...formData, role: e.target.value });
                    }}
                  >
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
                    onChange={(e) => {
                      setFormData({ ...formData, gender: e.target.value * 1 });
                    }}
                  >
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
                  <p className={cx("text-content-secondary")}>
                    Hoặc đăng nhập bằng
                  </p>
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
                          alt="Google Login   "
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
