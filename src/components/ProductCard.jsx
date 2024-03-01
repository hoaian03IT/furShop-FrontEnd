import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { formatCurrencyVND } from "~/utils";
import { FaEye } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import styles from "~/styles/ProductCard.module.scss";
const cx = classNames.bind(styles);

export const ProductCard = ({ imgs = [], title, price, discount = 0, link }) => {
    const realPrice = formatCurrencyVND(discount > 0 ? price - price * discount : price);

    const handleAddToCard = () => {};

    return (
        <div className={cx("wrapper", "w-100")}>
            <div className={cx("img-wrapper")}>
                <Link to={link} className={cx("img-link", "d-block w-100 h-100")}>
                    <img draggable={false} src={imgs[0]} alt="" className={cx("img", "first")} />
                    {imgs.length > 1 && <img draggable={false} src={imgs[1]} alt="" className={cx("img", "second")} />}
                </Link>
                <div className={cx("group-btn")}>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip>
                                <span style={{ fontSize: 10 }}>Thêm vào giỏ hàng</span>
                            </Tooltip>
                        }>
                        <button className={cx("add-card")}>
                            <CiShoppingCart className="fs-6" />
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip>
                                <span style={{ fontSize: 10 }}>Xem nhanh</span>
                            </Tooltip>
                        }>
                        <button className={cx("view-detail")}>
                            <FaEye className="fs-6" />
                        </button>
                    </OverlayTrigger>
                </div>
            </div>
            <div className={cx("content", "mt-2")}>
                <OverlayTrigger placement="top" overlay={<span style={{ fontSize: 10 }}>{title}</span>}>
                    <Link to={link} className={cx("title", "fw-semibold limit-line-1")}>
                        {title}
                    </Link>
                </OverlayTrigger>
                <span className="fw-normal text-black">{formatCurrencyVND(realPrice)}</span>
                {discount > 0 && (
                    <div>
                        <span
                            className={cx(
                                "origin-price",
                                "fw-semibold text-black-50 text-decoration-line-through me-2"
                            )}>
                            {price}
                        </span>
                        <span className={cx("discount", "text-danger")}>-{discount * 100}%</span>
                    </div>
                )}
            </div>
        </div>
    );
};
