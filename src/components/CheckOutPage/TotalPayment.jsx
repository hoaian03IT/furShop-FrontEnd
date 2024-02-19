import classNames from "classnames/bind";
import styles from "~/styles/TotalPayment.module.scss";

const cx = classNames.bind(styles);

export const TotalPayment = ({ price, fee }) => {
  const total = price + fee;
  return (
    <div className={cx("total")}>
      <div class={cx("money")}>
        <div className={cx("provisional")}>
          <span className={cx("name")}>Tạm tính</span>
          <span className={cx("provisionalPrice")}>
            {price.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
        <div className={cx("fee")}>
          <span className={cx("feeName")}>Phí vận chuyển</span>
          <span className={cx("feePrice")}>
            {fee.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      </div>
      <div className={cx("totalProduct")}>
        <span className={cx("totalName")}>Tổng cộng</span>
        <span className={cx("totalPrice")}>
          {total.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
    </div>
  );
};
