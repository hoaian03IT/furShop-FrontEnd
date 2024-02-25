import { ProductCardPreview } from "./ProductCardPreview";

import classNames from "classnames/bind";
import styles from "~/styles/ResultSearchModal.module.scss";
const cx = classNames.bind(styles);

export const ResultSearchModal = ({ show, onHide, listProduct = [] }) => {
    return (
        <div className={cx("wrapper", show ? "show" : "")}>
            {listProduct.map((product) => (
                <ProductCardPreview key={product._id} product={product} hideModal={onHide} />
            ))}
        </div>
    );
};
