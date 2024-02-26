import classNames from "classnames/bind";
import styles from "~/styles/SectionCheckOut.module.scss";
import Address from "~/components/CheckOutPage/Address";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";

const cx = classNames.bind(styles);

export const SectionCheckOut = ({ link }) => {
  const [addressName, setAddressName] = useState("");
  const handleSetAddressName = (newAddressName) => {
    setAddressName(newAddressName);
  };
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [billingPhone, setbillingPhone] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [billingPhoneError, setBillingPhoneError] = useState(false);
  const [provinceError, setProvinceError] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };
  const handleBillingPhoneChange = (e) => {
    const value = e.target.value;
    setbillingPhone(value);
  };
  const handleSubmit = (e) => {
    setEmailError(
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email) ||
        email.trim() === ""
    );
    setNameError(!/^[A-Za-z\s]+$/.test(name) || name.trim() === "");
    setBillingPhoneError(!/^\d{10,11}$/.test(billingPhone));
    setProvinceError(
      addressName.trim() === "" || addressName.trim() === "thành--"
    );
  };
  return (
    <div>
      <div className={cx("header")}>
        <h2 className={cx("title")}>Thông tin nhận hàng</h2>
      </div>
      <div className={cx("content")}>
        <div className={cx("field")}>
          <input
            type="email"
            id="email"
            className={cx("input")}
            placeholder="Email"
            onChange={handleEmailChange}
          ></input>
          {emailError && (
            <span className={cx("error")}>
              Vui lòng nhập Email (kiểm tra lại Email)
            </span>
          )}
        </div>
        <div className={cx("field")}>
          <input
            type="name"
            id="name"
            className={cx("input")}
            placeholder="Họ và tên"
            onChange={handleNameChange}
          ></input>
          {nameError && (
            <span className={cx("error")}>
              Vui lòng nhập Họ và tên (kiểm tra lại Họ và tên)
            </span>
          )}
        </div>
        <div className={cx("field")}>
          <input
            type="billingPhone"
            id="billingPhone"
            className={cx("input")}
            placeholder="Số điện thoại"
            onChange={handleBillingPhoneChange}
          ></input>
          {billingPhoneError && (
            <span className={cx("error")}>
              Vui lòng nhập số điện thoại (kiểm tra lại số điện thoại)
            </span>
          )}
        </div>
        <div className={cx("field")}>
          <input
            type="billingAddress"
            id="billingAddress"
            className={cx("input")}
            placeholder="Địa chỉ (tùy chọn)"
          ></input>
        </div>
        <Address
          setAddressName={handleSetAddressName}
          setProvinceError={setProvinceError}
        />
        {provinceError && (
          <span className={cx("error")}>Vui lòng chọn tỉnh/thành phố</span>
        )}
        <div className={cx("note")}>
          <label htmlFor="note" className={cx("field-note")}>
            Ghi chú (tùy chọn)
          </label>
          <textarea className={cx("noteText")} id="note" name="note"></textarea>
        </div>
      </div>
      <div className={cx("btn_group")}>
        <Link to={link} className={cx("link_cart")}>
          <FaAngleLeft className={cx("icon")} />
          <span className={cx("title-btn")}>Giỏ hàng</span>
        </Link>
        <button className={cx("btn")} type="submit" onClick={handleSubmit}>
          <span className={cx("content-btn")}>Thanh toán</span>
        </button>
      </div>
    </div>
  );
};
