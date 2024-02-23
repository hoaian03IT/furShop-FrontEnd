import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "~/styles/CheckOutBill.module.scss";

const cx = classNames.bind(styles);

export const CheckOutBill = ({}) => {
  const handleCheckOut = () => {
    return;
  };
  return (
    <div className={cx("checkOut")}>
      <Link to={"/thanh-toan"}>
        <button
          title="Tiến hành thanh toán"
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
