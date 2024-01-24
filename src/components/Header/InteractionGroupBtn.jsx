import classNames from "classnames/bind";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { CiSearch, CiUser, CiShoppingCart } from "react-icons/ci";
import { HeaderContext } from "./Header";

import styles from "~/styles/InteractionGroupBtn.module.scss";
import { useContext } from "react";

const cx = classNames.bind(styles);

export const InteractionGroupBtn = () => {
    const { setShowSearchOffCanvas } = useContext(HeaderContext);

    return (
        <div className={cx("wrapper")}>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Tìm kiếm</Tooltip>}>
                <div className={cx("action", "search")} onClick={() => setShowSearchOffCanvas((prev) => !prev)}>
                    <CiSearch className="fs-2" />
                </div>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Đăng nhập</Tooltip>}>
                <div className={cx("action", "login-register")}>
                    <CiUser className="fs-2" />
                </div>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Giỏ hàng</Tooltip>}>
                <div className={cx("action", "cart")}>
                    <CiShoppingCart className="fs-2" />
                    <span className={cx("number-item-in-cart")}>9+</span>
                </div>
            </OverlayTrigger>
        </div>
    );
};
