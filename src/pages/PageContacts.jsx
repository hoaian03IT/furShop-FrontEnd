import { pathname } from "~/configs/path";
import styles from "~/styles/Contacts.module.scss";
import classNames from "classnames/bind";
import { Container, Form } from "react-bootstrap";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { useState } from "react";
import { GiPositionMarker } from "react-icons/gi";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdEmail } from "react-icons/md";

const cx = classNames.bind(styles);

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Họ và tên không được để trống!";
    }
    if (!formData.phone.trim()) {
      validationErrors.phone = "Số điện thoại không được để trống!";
    } else if (!/^\d{10,11}$/.test(formData.phone.trim())) {
      validationErrors.phone = "Số điện thoại không hợp lệ!";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email không được để trống!";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      validationErrors.email = "Email không đúng định dạng!";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert("Gửi liên hệ thành công ");
    }
  };

  return (
    <div>
      <BreadCrumbs
        hrefs={[
          { path: pathname.home, name: "Trang chủ", isCurrent: false },
          { path: pathname.login, name: "Liên hệ", isCurrent: true },
        ]}
      />
      <Container>
        <div className={cx("container")}>
          <div className={cx("left-content")}>
            <h4>Công ty TNHH NamDepTrai</h4>
            <div className={cx("content")}>
              <div className={cx("content__information")}>
                <GiPositionMarker />{" "}
                <span> Địa chỉ: Trieu Dong , Trieu Phong , Quang Tri</span>
              </div>
              <div className={cx("content__information")}>
                {" "}
                <IoIosPhonePortrait />
                <span> Số điện thoại: 0999999999</span>
              </div>
              <div className={cx("content__information")}>
                <MdEmail />
                <span> Email: Namdeptraivler@gmail.com</span>
              </div>
            </div>
            <hr />
            <span style={{ fontWeight: "bold" }}>LIÊN HỆ VỚI CHÚNG TÔI</span>
            <Form action="" onSubmit={handleSubmit}>
              <div className={cx("form-group")}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Họ tên *"
                  style={{ padding: "5px 10px", outline: "none" }}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                {errors.name && (
                  <span className={cx("error-msg")}>{errors.name}</span>
                )}
              </div>
              <div className={cx("form-group")}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email *"
                  style={{ padding: "5px 10px", outline: "none" }}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <span className={cx("error-msg")}>{errors.email}</span>
                )}
              </div>
              <div className={cx("form-group")}>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Số điện thoại *"
                  style={{ padding: "5px 10px", outline: "none" }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                />
                {errors.phone && (
                  <span className={cx("error-msg")}>{errors.phone}</span>
                )}
              </div>
              <div className={cx("form-group")}>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Nhập nội dung *"
                ></textarea>
              </div>
              <div>
                <button className={cx("submit")}>Gửi liên hệ của bạn</button>
              </div>
            </Form>
          </div>
          <div className={cx("right-content")}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d816388.9455284234!2d106.29309776650886!3d16.734180004068723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3140e4abaa1df129%3A0xe471fae020d54d28!2zUXXhuqNuZyBUcuG7iywgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2s!4v1709130879199!5m2!1svi!2s"
              width="100%"
              height="95%"
              style={{ border: "0px", borderRadius: "10px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </Container>
    </div>
  );
}
