import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { pathname } from "~/configs/path";
import styles from "~/styles/ProductCardPreview.module.scss";
import { formatCurrencyVND } from "~/utils";
const cx = classNames.bind(styles);

export const ProductCardPreview = ({ product, hideModal }) => {
    const price = product?.discount ? formatCurrencyVND(product?.price * (1 - product?.discount)) : product?.price;
    return (
        <Link
            className={cx("wrapper", "d-flex")}
            to={pathname.productDetail.split(":")[0] + product?._id}
            onClick={hideModal}>
            <div className={cx("image")}>
                <img src={product?.attributes[0].image} alt="product" />
            </div>
            <div className={cx("description", "ms-2")}>
                <h6 className={cx("name")}>{product?.productName}</h6>
                <span className={cx("price")}>{price}</span>
                <span className={cx("origin-price", "ms-2")}>{formatCurrencyVND(product?.price)}</span>
                <span className={cx("discount", "ms-2 text-danger")}>-{product?.discount * 100}%</span>
            </div>
        </Link>
    );
};
