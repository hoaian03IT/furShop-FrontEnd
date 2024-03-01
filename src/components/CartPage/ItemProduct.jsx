import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";

import { HiMiniMinus } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import styles from "~/styles/ItemProduct.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadToCardApi } from "~/api-server";
import { axiosInterceptor } from "~/utils/axiosInterceptor";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
export const ItemProduct = ({
    link,
    img,
    nameProduct,
    description,
    size,
    color,
    price,
    discount = 0,
    amount,
    totalQuantity,
    productId,
    attributesId,
}) => {
    const [quantity, setQuantity] = useState(amount);
    const realPrice = discount > 0 ? price - price * discount : price;
    const { user } = useSelector((state) => state.persist);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosJWT = axiosInterceptor(user, dispatch, navigate);

    const handleUploadItem = async (quantity) => {
        if (quantity >= 1 && quantity <= totalQuantity) {
            await uploadToCardApi(
                {
                    amount: quantity,
                    productId,
                    productAttributes: attributesId,
                },
                axiosJWT,
                dispatch
            );
        }
    };

    const handleIncreaseQuantity = async () => {
        let newQuantity = Number(quantity);
        if (quantity < totalQuantity) {
            newQuantity++;
            await handleUploadItem(newQuantity);
        } else {
            newQuantity = totalQuantity;
        }
        setQuantity(newQuantity);
    };
    const handleReduceQuantity = async () => {
        const minValue = 1;
        let newQuantity = Number(quantity);
        if (quantity > minValue) {
            newQuantity--;
            await handleUploadItem(newQuantity);
        } else {
            newQuantity = 1;
        }
        setQuantity(newQuantity);
    };

    const handleInputChange = async (e) => {
        let newQuantity = Number(quantity);
        if (e.target.value > totalQuantity) {
            newQuantity = totalQuantity;
        } else if (e.target.value < 1) {
            newQuantity = 1;
        } else {
            newQuantity = Number(e.target.value);
        }
        await handleUploadItem(newQuantity);

        setQuantity(newQuantity);
    };

    return (
        <div className={cx("cart-item-product")}>
            <div className={cx("cart-icon-close")}>
                <IoCloseOutline title="Xóa" className={cx("icon-close")} />
            </div>
            <div className={cx("cart-image")}>
                <Link to={link}>
                    <Image className={cx("cart-image-product")} src={img} alt="logo" />
                </Link>
            </div>
            <div className={cx("cart-info")}>
                <div className={cx("cart-info-title")}>
                    <h3 className={cx("product-name")}>
                        <Link to={link}>{nameProduct}</Link>
                    </h3>
                    <span className={cx("product-description")}>
                        {size} - {color}
                    </span>
                </div>
                <div className={cx("product-right")}>
                    <div className={cx("cart-price")}>
                        {/* <span className={cx("product-price")}>{formatCurrencyVND(realPrice)}</span> */}
                    </div>
                    <div className={cx("cart-select-item")}>
                        <button className={cx("btn_product")} type="button" onClick={handleReduceQuantity}>
                            <HiMiniMinus />
                        </button>
                        <input
                            className={cx("quantity-product")}
                            type="number"
                            value={quantity}
                            onChange={handleInputChange}></input>
                        <button className={cx("btn_product_right")} type="button" onClick={handleIncreaseQuantity}>
                            <GoPlus />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
