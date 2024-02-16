import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";

import { HiMiniMinus } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import styles from "~/styles/ItemProduct.module.scss";

const cx = classNames.bind(styles);
export const ItemProduct = ({
  link,
  img,
  nameProduct,
  description,
  price,
  discount = 0,
  quantity = 1,
  setQuantity,
}) => {
  const realPrice = discount > 0 ? price - price * discount : price;
  const handleIncreaseQuantity = () => {
    const maxValue = 10;
    if (quantity < maxValue) {
      setQuantity((a) => a + 1);
    }
  };
  const handleReduceQuantity = () => {
    const minValue = 0;
    if (quantity > minValue) {
      setQuantity((a) => a - 1);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    const isNumeric = /^[0-9]+$/.test(inputValue);

    if (isNumeric) {
      setQuantity(parseInt(inputValue, 10));
    } else {
      setQuantity(0);
    }
  };

  return (
    <div className={cx("cart-item-product")}>
      <div className={cx("cart-icon-close")}>
        <Link to={link}>
          <IoCloseOutline title="Xóa" className={cx("icon-close")} />
        </Link>
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
          <span className={cx("product-description")}>{description}</span>
        </div>
        <div className={cx("product-right")}>
          <div className={cx("cart-price")}>
            <span className={cx("product-price")}>
              {realPrice.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <div className={cx("cart-select-item")}>
            <button
              className={cx("btn_product")}
              type="button"
              onClick={handleReduceQuantity}
            >
              <HiMiniMinus />
            </button>
            <input
              className={cx("quantity-product")}
              type="text"
              value={quantity}
              onChange={handleInputChange}
            ></input>
            <button
              className={cx("btn_product_right")}
              type="button"
              onClick={handleIncreaseQuantity}
            >
              <GoPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
