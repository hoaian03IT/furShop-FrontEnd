import classNames from "classnames/bind";
import styles from "~/styles/SidebarOrder.module.scss";
import product from "~/assets/imgs/product1.png";
import { ProductOrder } from "~/components/CheckOutPage/ProductOrder";
import { CouponProduct } from "~/components/CheckOutPage/CouponProduct";
import { TotalPayment } from "~/components/CheckOutPage/TotalPayment";

const cx = classNames.bind(styles);
export const SidebarOrder = ({
  quantity = 1,
  price = 1000000,
  fee = 40000,
}) => {
  return (
    <div className={cx("sidebar")}>
      <div className={cx("header")}>
        <h2 className={cx("title")}>Đơn hàng ({quantity} sản phẩm)</h2>
      </div>
      <div className={cx("content")}>
        <div className={cx("contentProduct")}>
          <ProductOrder
            img={product}
            name={"Bàn học"}
            decription="gỗ liêm"
            price={price}
            quantity={quantity}
          />
        </div>
        <div className={cx("contentCoupon")}>
          <CouponProduct />
        </div>
        <div className={cx("contentTotal")}>
          <TotalPayment price={price} fee={fee} />
        </div>
      </div>
    </div>
  );
};
