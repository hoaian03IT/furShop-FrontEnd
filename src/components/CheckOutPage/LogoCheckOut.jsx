import classNames from "classnames/bind";
import styles from "~/styles/LogoCheckOut.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

export const LogoCheckOut = () => {
  return (
    <Link to={"/"}>
      <h1 className={cx("logo")}>EGA Sportswear</h1>
    </Link>
  );
};
