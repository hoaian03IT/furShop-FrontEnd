import classNames from "classnames/bind";
import styles from "~/styles/CheckOutBill.module.scss";

const cx = classNames.bind(styles);

export const CheckOutBill = ({}) => {
  const handleCheckOut = () => {
    return;
  };
  return (
    <div className={cx("checkOut")}>
      <button
        title="Tiến hành thanh toán"
        className={cx("btn")}
        type="button"
        onClick={handleCheckOut}
      >
        <span>Thanh Toán</span>
      </button>
    </div>
  );
};
