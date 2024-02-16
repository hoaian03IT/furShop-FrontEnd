import classNames from "classnames/bind";
import styles from "~/styles/Trustbadge.module.scss";
import img1 from "~/assets/imgs/footer_trustbadge.webp";

import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

export const Trustbadge = () => {
  return (
    <div className={cx("trustbadge")}>
      <Link to={"/"}>
        <img src={img1} alt="" className={cx("image")}></img>
      </Link>
    </div>
  );
};
