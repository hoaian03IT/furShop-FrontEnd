import classNames from "classnames/bind";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { CiSearch, CiUser, CiShoppingCart } from "react-icons/ci";
import { HeaderContext } from "./Header";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "~/styles/InteractionGroupBtn.module.scss";
import { logoutApi } from "~/api-server";
import { axiosInterceptor } from "~/utils/axiosInterceptor";
import { pathname } from "~/configs/path";

const cx = classNames.bind(styles);

export const InteractionGroupBtn = () => {
  const { setShowSearchOffCanvas } = useContext(HeaderContext);

  const { user, cart } = useSelector((state) => state.persist);
  const { userInfo } = user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const axiosJWT = axiosInterceptor(user, dispatch, navigate);

  const handleLogout = async () => {
    try {
      await logoutApi(dispatch, navigate, axiosJWT);
    } catch (error) {}
  };

  return (
    <div className={cx("wrapper")}>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>Tìm kiếm</Tooltip>}>
        <div
          className={cx("action", "search")}
          onClick={() => setShowSearchOffCanvas((prev) => !prev)}
        >
          <CiSearch className="fs-2" />
        </div>
      </OverlayTrigger>
      {user.isLogged ? (
        <OverlayTrigger
          placement="bottom"
          trigger="click"
          overlay={
            <div className={cx("tooltip-user-logged")}>
              <Link className={cx("item", "link")} to={pathname.account}>
                Thông tin cá nhân
              </Link>
              <Link className={cx("item", "link")} to={"/profile"}>
                Yêu thích
              </Link>
              <button
                className={cx("item", "btn-logged")}
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <img
            className={cx("avatar-username")}
            src={userInfo?.image}
            alt={userInfo?.username}
          />
        </OverlayTrigger>
      ) : (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>Đăng nhập</Tooltip>}
        >
          <Link to={"./dang-nhap"} className={cx("action", "login-register")}>
            <CiUser className="fs-2" />
          </Link>
        </OverlayTrigger>
      )}
      <OverlayTrigger placement="bottom" overlay={<Tooltip>Giỏ hàng</Tooltip>}>
        <Link to={"/gio-hang"} className={cx("action", "cart")}>
          <CiShoppingCart className="fs-2" />
          <span className={cx("number-item-in-cart")}>
            {cart.cartItems.length > 9 ? "9+" : cart.cartItems.length}
          </span>
        </Link>
      </OverlayTrigger>
    </div>
  );
};
