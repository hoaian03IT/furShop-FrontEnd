import { pathname } from "~/configs/path";
import styles from "~/styles/CartPage.module.scss";
import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
// import product from "~/assets/imgs/product1.png";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { ItemProduct } from "~/components/CartPage/ItemProduct";
import { NoteProduct } from "~/components/CartPage/NoteProduct";
import { TimeDelivery } from "~/components/CartPage/TimeDelivery";
import { CheckBoxBill } from "~/components/CartPage/CheckBoxBill";
import { PaymentCompany } from "~/components/CartPage/PaymentCompany";
import { TotalBill } from "~/components/CartPage/TotalBill";
import { CouponBill } from "~/components/CartPage/CouponBill";
import { CheckOutBill } from "~/components/CartPage/CheckOutBill";
import { Trustbadge } from "~/components/CartPage/Trustbadge";
import { useEffect, useMemo, useState } from "react";
import * as sv from "~/config-axios";
const cx = classNames.bind(styles);

export default function CartPage() {
  const [quantity, setQuantity] = useState(1);
  const [textValue, setTextValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const datas = await sv.get("gio-hang/xem-gio-hang", {
        customerId: "65db441b4e38ab6618ee0f26",
      });
      if (datas && datas?.status === 200 && datas?.statusText === "OK") {
        const dataCart = datas.data.data;
        setData(dataCart);
      }
    })();
  }, [JSON.stringify(data)]);

  const totalPrice = useMemo(() => {
    return data.reduce((first, item, i) => {
      const product = item.productId;
      const att = item.productAttributes;
      return product.price * item.amount * (1 - product.discount) + first;
    }, 0);
  });

  return (
    <div>
      <BreadCrumbs
        hrefs={[
          { path: pathname.home, name: "Trang chủ", isCurrent: false },
          {
            path: pathname.cart,
            name: "Giỏ hàng",
            isCurrent: true,
          },
        ]}
      />
      <Container>
        <div className={cx("cart-container")}>
          <h1 className={cx("cart-title")}>Giỏ hàng</h1>
          <div className={cx("cart-content")}>
            <Row>
              <Col md={8}>
                <div className={cx("cart-content-product")}>
                  {data.map((item, index) => {
                    console.log(item);
                    const product = item.productId;
                    const attributes = item.productAttributes;
                    return (
                      <ItemProduct
                        key={index}
                        link={"/chi-tiet-san-pham"}
                        img={product.image}
                        nameProduct={product.productName}
                        description={product.description}
                        price={product.price}
                        discount={product.discount}
                        quantity={item.amount}
                        setQuantity={setQuantity}
                      />
                    );
                  })}
                  <div className={cx("cart-note")}>
                    <NoteProduct
                      label={"Ghi chú hóa đơn"}
                      textValue={textValue}
                      setTextValue={setTextValue}
                    />
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className={cx("cart-checkout")}>
                  <TimeDelivery title={"HẸN GIỜ NHẬN HÀNG"} />
                  <CheckBoxBill
                    label={"Xuất hóa đơn công ty"}
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                  <div className={cx("form", checked ? "show" : "hide")}>
                    <PaymentCompany />
                  </div>
                  <TotalBill name={"TỔNG CỘNG"} total={totalPrice} />
                  <CouponBill />
                  <CheckOutBill />
                  <Trustbadge />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}
