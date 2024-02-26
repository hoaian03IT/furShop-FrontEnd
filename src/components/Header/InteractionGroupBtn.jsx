import classNames from "classnames/bind";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { CiSearch, CiUser, CiShoppingCart } from "react-icons/ci";
import { HeaderContext } from "./Header";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "~/styles/InteractionGroupBtn.module.scss";

const cx = classNames.bind(styles);

export const InteractionGroupBtn = () => {
    const { setShowSearchOffCanvas } = useContext(HeaderContext);

    const { userInfo } = useSelector((state) => state.persist.user);

    console.log(userInfo);

    return (
        <div className={cx("wrapper")}>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Tìm kiếm</Tooltip>}>
                <div className={cx("action", "search")} onClick={() => setShowSearchOffCanvas((prev) => !prev)}>
                    <CiSearch className="fs-2" />
                </div>
            </OverlayTrigger>
            {Object.keys(userInfo).length > 0 ? (
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Đăng nhập</Tooltip>}>
                    <Link to={"./dang-nhap"} className={cx("action", "login-register")}>
                        <CiUser className="fs-2" />
                    </Link>
                </OverlayTrigger>
            ) : (
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Đăng nhập</Tooltip>}>
                    <img src={userInfo?.image} alt={userInfo?.username} />
                </OverlayTrigger>
            )}
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Giỏ hàng</Tooltip>}>
                <Link to={"/gio-hang"} className={cx("action", "cart")}>
                    <CiShoppingCart className="fs-2" />
                    <span className={cx("number-item-in-cart")}>9+</span>
                </Link>
            </OverlayTrigger>
        </div>
    );
};
