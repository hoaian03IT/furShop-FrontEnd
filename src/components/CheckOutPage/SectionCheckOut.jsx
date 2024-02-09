import classNames from "classnames/bind";
import styles from "~/styles/SectionCheckOut.module.scss";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Address from "~/components/CheckOutPage/Address";
import { useState } from "react";

const cx = classNames.bind(styles);

export const SectionCheckOut = ({ link }) => {
  const [addressName, setAddressName] = useState("");
  const handleSetAddressName = (newAddressName) => {
    setAddressName(newAddressName);
  };
  return (
    <div>
      <div className={cx("header")}>
        <h2 className={cx("title")}>Thông tin nhận hàng</h2>
        <Link to={link} className={cx("link")}>
          <FaUserCircle />
          <span>Đăng nhập</span>
        </Link>
      </div>
      <div className={cx("content")}>
        <div className={cx("field")}>
          <input
            type="email"
            id="email"
            className={cx("input")}
            placeholder="Email"
          ></input>
        </div>
        <div className={cx("field")}>
          <input
            type="name"
            id="name"
            className={cx("input")}
            placeholder="Họ và tên"
          ></input>
        </div>
        <div className={cx("field")}>
          <input
            type="billingPhone"
            id="billingPhone"
            className={cx("input")}
            placeholder="Số điện thoại (tùy chọn)"
          ></input>
        </div>
        <div className={cx("field")}>
          <input
            type="billingAddress"
            id="billingAddress"
            className={cx("input")}
            placeholder="Địa chỉ (tùy chọn)"
          ></input>
        </div>

        <Address setAddressName={handleSetAddressName} />
        <div className={cx("note")}>
          <label htmlFor="note" className={cx("field-note")}>
            Ghi chú (tùy chọn)
          </label>
          <textarea className={cx("noteText")} id="note" name="note"></textarea>
        </div>
      </div>
    </div>
  );
};
