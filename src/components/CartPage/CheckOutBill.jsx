import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "~/styles/CheckOutBill.module.scss";

const cx = classNames.bind(styles);

export const CheckOutBill = ({ disabled }) => {
  const handleCheckOut = () => {
    return;
  };
  return (
    <div className={cx("checkOut")}>
      <Link to={"/thanh-toan"}>
        <button
          title="Tiến hành thanh toán"
          disabled={disabled}
          className={cx("btn")}
          type="button"
          onClick={handleCheckOut}
        >
          <span>Thanh Toán</span>
        </button>
      </Link>
    </div>
  );
};
