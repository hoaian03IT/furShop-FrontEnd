import classNames from "classnames/bind";
import styles from "~/styles/CouponBill.module.scss";
import coupon from "~/assets/imgs/coupon-icon.png";
import { MdKeyboardArrowRight } from "react-icons/md";
const cx = classNames.bind(styles);

export const CouponBill = ({}) => {
  return (
    <div className={cx("CouponBill")}>
      <div className={cx("left")}>
        <img src={coupon} alt=" " className={cx("image")} />
        <span className={cx("title")}>Mã giảm giá</span>
      </div>
      <div className={cx("right")}>
        <span className={cx("name")}>Chọn mã giảm giá</span>
        <MdKeyboardArrowRight className={cx("icon")} />
      </div>
    </div>
  );
};
