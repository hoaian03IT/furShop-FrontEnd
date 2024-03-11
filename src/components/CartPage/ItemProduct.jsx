import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";

import { HiMiniMinus } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import styles from "~/styles/ItemProduct.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteToCartApi, uploadToCardApi } from "~/api-server";
import { axiosInterceptor } from "~/utils/axiosInterceptor";

const cx = classNames.bind(styles);
export const ItemProduct = ({
  link,
  img,
  nameProduct,
  description,
  size,
  color,
  amount,
  totalQuantity,
  cartId,
}) => {
  const [quantity, setQuantity] = useState(amount);
  const { user } = useSelector((state) => state.persist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkLoad, setCheckLoad] = useState(false);
  const axiosJWT = axiosInterceptor(user, dispatch, navigate);

  const handleIncreaseQuantity = (e) => {
    if (quantity === totalQuantity) return;
    setCheckLoad(true);
    setQuantity(quantity + 1);
  };
  const handleReduceQuantity = () => {
    if (quantity === 1) return;
    setCheckLoad(true);
    setQuantity(quantity - 1);
  };

  const handleInputChange = (e) => {
    let amount = e.target.value * 1;
    if (!amount) {
      amount = 0;
      setCheckLoad(false);
      setQuantity(0);
    } else if (amount && amount <= totalQuantity) {
      setCheckLoad(true);
      setQuantity(amount);
    } else {
      setCheckLoad(true);
      setQuantity(totalQuantity);
    }
  };

  const handleBlurAmount = () => {
    if (quantity === 0) {
      setCheckLoad(true);
      setQuantity(1);
    }
  };

  const handleDeleteProduct = () => {
    (async () => {
      try {
        await deleteToCartApi({ cartId: cartId }, axiosJWT, dispatch);
      } catch (error) {
        console.log(error.message);
      }
    })();
  };

  useEffect(() => {
    if (checkLoad) {
      (async () => {
        try {
          await uploadToCardApi(
            { cartId: cartId, amount: quantity },
            axiosJWT,
            dispatch
          );
        } catch (error) {}
      })();
    }
  }, [quantity]);

  return (
    <div className={cx("cart-item-product")}>
      <button className={cx("cart-icon-close")} onClick={handleDeleteProduct}>
        <IoCloseOutline title="Xóa" className={cx("icon-close")} />
      </button>
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
              type="number"
              value={quantity}
              onChange={handleInputChange}
              onBlur={handleBlurAmount}
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
