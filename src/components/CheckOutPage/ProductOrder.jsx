import classNames from "classnames/bind";
import styles from "~/styles/ProductOrder.module.scss";
import { Image } from "react-bootstrap";
import { formatCurrencyVND } from "~/utils";

const cx = classNames.bind(styles);

export const ProductOrder = ({ img, name, decription, price, quantity }) => {
    return (
        <div className={cx("product")}>
            <div className={cx("product-left")}>
                <div className={cx("image")}>
                    <Image className={cx("imageProduct")} src={img} alt="product" />
                    <span className={cx("quantity")}>{quantity}</span>
                </div>
                <div className={cx("description")}>
                    <h4 className={cx("name")}>{name}</h4>
                    <div className={cx("decriptionProduct")}>{decription}</div>
                </div>
            </div>
            <div className={cx("money")}>
                <span className={cx("product-price")}>{formatCurrencyVND(price)}</span>
            </div>
        </div>
    );
};
