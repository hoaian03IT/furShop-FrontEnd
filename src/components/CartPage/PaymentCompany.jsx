import classNames from "classnames/bind";
import { useState } from "react";
import styles from "~/styles/PaymentCompany.module.scss";

const cx = classNames.bind(styles);
export const PaymentCompany = () => {
  const [name, setName] = useState("");
  const [tax, setTax] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const [nameError, setNameError] = useState(false);
  const [taxError, setTaxError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(value.trim() === "");
  };

  const handleTaxChange = (e) => {
    const value = e.target.value;
    setTax(value);
    setTaxError(value.trim() === "");
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    setAddressError(value.trim() === "");
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!isValidEmail(value));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={cx("company-bill")}>
      <div className={cx("form-group")}>
        <label>{"Tên công ty"}</label>
        <input
          type={"text"}
          className={cx("name")}
          placeholder={"Tên công ty"}
          onChange={handleNameChange}
        ></input>
        {nameError && (
          <span className={cx("infor")}>
            Bạn không được để trống trường này
          </span>
        )}
      </div>
      <div className={cx("form-group-tax")}>
        <label>{"Mã số thuế"}</label>
        <input
          type={"number"}
          className={cx("tax")}
          placeholder={"Mã số thuế"}
          onChange={handleTaxChange}
        ></input>
        {taxError && (
          <span className={cx("infor")}>
            Bạn không được để trống trường này
          </span>
        )}
      </div>
      <div className={cx("form-group-address")}>
        <label>{"Địa chỉ công ty"}</label>
        <textarea
          type={"text"}
          className={cx("address")}
          placeholder={
            "Nhập địa chỉ công ty (bao gồm Phường/Xã, Quận/Huyện, Tỉnh/Thành phố nếu có)"
          }
          onChange={handleAddressChange}
        />
        {addressError && (
          <span className={cx("infor")}>
            Bạn không được để trống trường này
          </span>
        )}
      </div>
      <div className={cx("form-group-email")}>
        <label>{"Email nhận hoá đơn"}</label>
        <input
          type={"text"}
          className={cx("email")}
          placeholder={"Email nhận hoá đơn"}
          onChange={handleEmailChange}
        ></input>
        {emailError && (
          <span className={cx("infor")}>Định dạng email không đúng</span>
        )}
      </div>
    </div>
  );
};
