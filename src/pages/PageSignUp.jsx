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
const cx = classNames.bind(styles);

export default function SignUp() {
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
                Bạn đã có tài khoản ? Đăng nhập&nbsp; <a href="# "> tại đây</a>{" "}
              </h6>
            </div>
            <div className={cx("signup-form ")}>
              <Form>
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
                    htmlFor="textfirstname"
                    className={cx("signup-form__label")}
                  >
                    Họ <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="textfirstname"
                    className={cx("signup-form__input")}
                    id="textfirstname"
                    placeholder="Họ"
                    required
                  />
                </div>
                <div className={cx("signup-form__group")}>
                  <label
                    htmlFor="textlastname"
                    className={cx("signup-form__label")}
                  >
                    Tên <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="textlastname"
                    className={cx("signup-form__input")}
                    id="textlastname"
                    placeholder="Tên "
                    required
                  />
                </div>
                <div className={cx("signup-form__group")}>
                  <label
                    htmlFor="phonenumber"
                    className={cx("signup-form__label")}
                  >
                    Số điện thoại <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="phone"
                    name="phonenumber"
                    className={cx("signup-form__input")}
                    id="phonenumber"
                    placeholder="Số điện thoại"
                    required
                    style={{}}
                  />
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
                    required
                  />
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
                    required
                  />
                </div>

                <br />

                <button className={cx("signup-form__submit")} type="submit">
                  ĐĂNG NHẬP
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
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
