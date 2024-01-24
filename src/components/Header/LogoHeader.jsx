import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import logoStyle2 from "~/assets/imgs/logo_style2.png";
import classNames from "classnames/bind";

import styles from "~/styles/LogoHeader.module.scss";

const cx = classNames.bind(styles);

export const LogoHeader = () => {
    return (
        <Link to="/">
            <Image className={cx("logo-image")} src={logoStyle2} alt="logo" />
        </Link>
    );
};
