import { pathname } from "~/configs/path";
import styles from "~/styles/ForgetAccount.scss";
import classNames from "classnames/bind";
import { Container, Form } from "react-bootstrap"; // Import Form from react-bootstrap
import { BreadCrumbs } from "~/components/BreadCrumbs";
import fb_login from "~/assets/imgs/login_facebook.png";
import gg_login from "~/assets/imgs/login_google.png";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

const cx = classNames.bind(styles);

export default function Login() {
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
                Bạn chưa có tài khoản ? <a href="# "> Đăng ký tại đây</a>{" "}
              </h6>
            </div>
            <Form className={cx("signup-form ")}>
              <h5 style={{display: "flex",justifyContent:"center",alignContent:"center"}}>ĐẶT LẠI MẬT KHẨU</h5>
              <p style={{display: "flex",justifyContent:"center",alignContent:"center",textAlign:"center"}}>
                Chúng tôi sẽ gửi cho bạn một email để kích hoạt việc đặt lại mật
                khẩu.
              </p>
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
              </div>{" "}
              <button className={cx("signup-form__submit")} type="submit">
                Lấy lại mật khẩu
              </button>
              <a href="#" style={{display: "flex",justifyContent:"center",alignContent:"center",padding:"10px"}}>Quay lại</a>
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
      </Container>
    </div>
  );
}
