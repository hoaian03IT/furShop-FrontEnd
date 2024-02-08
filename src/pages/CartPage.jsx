import { pathname } from "~/configs/path";
import styles from "~/styles/CartPage.module.scss";
import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import product from "~/assets/imgs/product1.png";
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
import { useState } from "react";
const cx = classNames.bind(styles);

export default function CartPage() {
  const [quantity, setQuantity] = useState(1);
  const [textValue, setTextValue] = useState("");
  const [checked, setChecked] = useState(false);
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
                  <ItemProduct
                    link={"/gio-hang"}
                    img={product}
                    nameProduct="Bàn học"
                    description="Đẹp gỗ liêm"
                    price={1000000}
                    discount={0.1}
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
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
                  <TotalBill name={"TỔNG CỘNG"} total={1000000} />
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
