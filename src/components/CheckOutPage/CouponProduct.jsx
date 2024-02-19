import classNames from "classnames/bind";
import { useState } from "react";
import styles from "~/styles/CouponProduct.module.scss";

const cx = classNames.bind(styles);

export const CouponProduct = () => {
  const [coupon, setCoupon] = useState("");

  const [couponError, setCouponError] = useState(false);
  const handleCouponProduct = (e) => {
    setCoupon(e.target.value);
  };
  const handleSubmit = (e) => {
    setCouponError(coupon.length < 8);
  };
  return (
    <div className={cx("filed")}>
      <div className={cx("coupon")}>
        <input
          className={cx("textbox")}
          type="text"
          placeholder="Nhập mã giảm giá"
          onChange={handleCouponProduct}
        ></input>
        <button className={cx("btn")} type="submit" onClick={handleSubmit}>
          Áp dụng
        </button>
      </div>
      {couponError && (
        <span className={cx("error")}>Mã giảm giá không hợp lệ</span>
      )}
    </div>
  );
};
