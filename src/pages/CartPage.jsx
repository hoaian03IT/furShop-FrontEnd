import { pathname } from "~/configs/path";
import styles from "~/styles/CartPage.module.scss";
import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import product from "~/assets/imgs/product1.png";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { ItemProduct } from "~/components/CartPage/ItemProduct";
import { useState } from "react";
const cx = classNames.bind(styles);

export default function CartPage() {
  const [quantity, setQuantity] = useState(1);
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
                  <div className={cx("cart-note")}>ghi chú</div>
                </div>
              </Col>
              <Col md={4}>
                <div className={cx("cart-content-price")}>asd</div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}
