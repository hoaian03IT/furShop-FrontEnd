import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrencyVND } from "~/utils";
import { FaEye } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { axiosInterceptor } from "~/utils/axiosInterceptor";
import { useSelector, useDispatch } from "react-redux";
import { QuickViewProductModal } from "./QuickViewProductModal";
import { useState } from "react";
import { pathname } from "~/configs/path";
import { uploadToCardApi } from "~/api-server";
import { toast } from "react-toastify";

import styles from "~/styles/ProductCard.module.scss";
const cx = classNames.bind(styles);

export const ProductCard = ({ product }) => {
    const { user, cart } = useSelector((state) => state.persist);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { discount, price, _id, productName, attributes = [] } = product;
    const imgs = product?.attributes.map((attr) => attr.image);
    const [showModalQuickView, setShowModalQuickView] = useState(false);
    const realPrice = formatCurrencyVND(discount > 0 ? price - price * discount : price);
    const link = pathname.productDetail.split(":")[0] + _id;

    const axiosJWT = axiosInterceptor(user, dispatch, navigate);

    const handleAddToCard = async () => {
        try {
            if (attributes.length === 1) {
                const existedItem = cart.cartItems.filter(
                    (item) => item.productId._id === _id && item.productAttributes._id === attributes[0]._id
                );
                console.log(existedItem);
                await uploadToCardApi(
                    {
                        amount: existedItem.length > 0 ? existedItem[0].amount + 1 : 1,
                        productId: _id,
                        productAttributes: attributes[0]._id,
                    },
                    axiosJWT,
                    dispatch
                );
                toast.success("Thêm sản phẩm vào giỏ hàng thành công");
            } else {
                toast.warn("Sản phẩm có nhiều loại, vui lòng lựa chọn");
                setShowModalQuickView(true);
            }
        } catch (error) {}
    };

    return (
        <div className={cx("wrapper", "w-100")}>
            <div className={cx("img-wrapper")}>
                <Link to={link} className={cx("img-link", "d-block w-100 h-100")}>
                    <img draggable={false} src={imgs[0]} alt="" className={cx("img", "first")} />
                    <img draggable={false} src={imgs[1] || imgs[0]} alt="" className={cx("img", "second")} />
                </Link>
                <div className={cx("group-btn")}>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip>
                                <span style={{ fontSize: 10 }}>Thêm vào giỏ hàng</span>
                            </Tooltip>
                        }>
                        <button className={cx("add-card")} onClick={handleAddToCard}>
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
                        <button className={cx("view-detail")} onClick={() => setShowModalQuickView(true)}>
                            <FaEye className="fs-6" />
                        </button>
                    </OverlayTrigger>
                </div>
            </div>
            <div className={cx("content", "mt-2")}>
                <OverlayTrigger placement="top" overlay={<span style={{ fontSize: 10 }}>{productName}</span>}>
                    <Link to={link} className={cx("title", "fw-semibold limit-line-1")}>
                        {productName}
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
            <QuickViewProductModal
                show={showModalQuickView}
                onHide={() => setShowModalQuickView(false)}
                product={product}
            />
        </div>
    );
};
