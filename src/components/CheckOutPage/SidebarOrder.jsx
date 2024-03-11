import classNames from "classnames/bind";
import styles from "~/styles/SidebarOrder.module.scss";
import product from "~/assets/imgs/product1.png";
import { ProductOrder } from "~/components/CheckOutPage/ProductOrder";
import { CouponProduct } from "~/components/CheckOutPage/CouponProduct";
import { TotalPayment } from "~/components/CheckOutPage/TotalPayment";
import { useSelector } from "react-redux";

import { useEffect, useMemo, useState } from "react";

const cx = classNames.bind(styles);
export const SidebarOrder = ({}) => {
  const { user } = useSelector((state) => state.persist);
  const { cartItems } = useSelector((state) => state.persist.cart);
  const [fee, setFee] = useState(0);
  const totalPrice = useMemo(() => {
    return cartItems.reduce((first, item) => {
      const price =
        item.productId.price * item.amount * (1 - item.productId.discount);
      return first + price;
    }, 0);
  }, [JSON.stringify(cartItems)]);
  const quantity = useMemo(() => {
    return cartItems.reduce((first, item) => {
      const amount = item.amount;
      return first + amount;
    }, 0);
  }, [JSON.stringify(cartItems)]);

  useEffect(() => {
    let calculatedFee = 0;
    if (totalPrice < 500000) {
      calculatedFee = 0;
    } else {
      calculatedFee = 40000;
    }
    setFee(calculatedFee);
  }, [totalPrice]);

  return (
    <div className={cx("sidebar")}>
      <div className={cx("header")}>
        <h2 className={cx("title")}>Đơn hàng ({quantity} sản phẩm)</h2>
      </div>
      <div className={cx("content")}>
        <div className={cx("contentProduct")}>
          {cartItems.map((item, index) => (
            <ProductOrder
              key={index}
              img={item.productAttributes.image}
              name={item.productId.productName}
              decription={
                item.productAttributes.size +
                " - " +
                item.productAttributes.color
              }
              price={item.productId.price}
              quantity={item.amount}
            />
          ))}
        </div>
        <div className={cx("contentCoupon")}>
          <CouponProduct />
        </div>
        <div className={cx("contentTotal")}>
          <TotalPayment price={totalPrice} fee={fee} />
        </div>
      </div>
    </div>
  );
};
