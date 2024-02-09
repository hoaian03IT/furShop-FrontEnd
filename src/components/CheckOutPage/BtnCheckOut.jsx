import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "~/styles/BtnCheckOut.module.scss";
import { FaAngleLeft } from "react-icons/fa";

const cx = classNames.bind(styles);

export const BtnCheckOut = ({ link }) => {
  return (
    <div className={cx("btn_group")}>
      <Link to={link} className={cx("link_cart")}>
        <FaAngleLeft className={cx("icon")} />
        <span className={cx("title")}>Giỏ hàng</span>
      </Link>
      <button className={cx("btn")} type="submit">
        <span className={cx("content")}>
          Tiếp tục chọn phương thức vận chuyển
        </span>
      </button>
    </div>
  );
};
