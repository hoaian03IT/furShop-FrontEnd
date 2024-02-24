import { pathname } from "~/configs/path";
import styles from "~/styles/ForgetAccount.scss";
import classNames from "classnames/bind";
import { Container, Form } from "react-bootstrap"; // Import Form from react-bootstrap
import { BreadCrumbs } from "~/components/BreadCrumbs";
import fb_login from "~/assets/imgs/login_facebook.png";
import gg_login from "~/assets/imgs/login_google.png";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useState } from "react";

const cx = classNames.bind(styles);

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email không được để trống !";
    } else if (
      !new RegExp(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}(?:.[a-zA-Z]{2,})?$"
      ).test(formData.email)
    ) {
      validationErrors.email = "Email không đúng định dạng";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert("Thành công");
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
                Bạn chưa có tài khoản ? <Link to={"/dang-ky"}> đăng ký tại đây</Link>
              </h6>
            </div>
            <div className={cx("signup-form ")}>
              <Form onSubmit={handleSubmit}>
                <h5
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  ĐẶT LẠI MẬT KHẨU
                </h5>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  Chúng tôi sẽ gửi cho bạn một email để kích hoạt việc đặt lại
                  mật khẩu.
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
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <span className={cx("error-msg")}>{errors.email}</span>
                  )}
                </div>
                <button className={cx("signup-form__submit")} type="submit">
                  Lấy lại mật khẩu
                </button>
                <Link
                  to={"/dang-nhap"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    padding: "20px",
                  }}
                >
                  Quay lại
                </Link>
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
