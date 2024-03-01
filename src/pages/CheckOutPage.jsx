import classNames from "classnames/bind";
import { pathname } from "~/configs/path";
import { Col, Container, Row } from "react-bootstrap";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { LogoCheckOut } from "~/components/CheckOutPage/LogoCheckOut";
import { SectionCheckOut } from "~/components/CheckOutPage/SectionCheckOut";
import { SidebarOrder } from "~/components/CheckOutPage/SidebarOrder";
import axios from "axios";
import styles from "~/styles/CheckOutPage.module.scss";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function CheckOutPage() {
  const [addressName, setAddressName] = useState("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [billingPhone, setbillingPhone] = useState("");

  const cartItems = useSelector((state) => state.persist);
  console.log(cartItems);

  // const product = useMemo(() => {
  //   return cartItems.reduce((first, item) => [
  //     ...first,
  //     { productId: item._id },
  //   ]);
  // });

  useEffect(() => {
    const handleCheckout = async () => {
      const dataToSend = {
        name: name,
        product: "",
        customerId: "",
        address: addressName,
        phoneNumber: billingPhone,
        paymentType: "",
      };
      try {
        // const response = await axios.post("/api/don-hang", dataToSend);
        // console.log("Đã gửi dữ liệu thành công:", response.data);
      } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
      }
    };

    handleCheckout();
  }, [name, email, addressName, billingPhone]);

  return (
    <div>
      <Container>
        <Row>
          <Col md={7}>
            <div className={cx("content")}>
              <LogoCheckOut />
              <BreadCrumbs
                hrefs={[
                  { path: pathname.cart, name: "Giỏ hàng", isCurrent: false },
                  {
                    path: pathname.checkout,
                    name: "Thanh toán",
                    isCurrent: true,
                  },
                ]}
              />
              <SectionCheckOut
                addressName={addressName}
                setAddressName={setAddressName}
                email={email}
                setEmail={setEmail}
                name={name}
                setName={setName}
                billingPhone={billingPhone}
                setbillingPhone={setbillingPhone}
                link={"/gio-hang"}
              />
            </div>
          </Col>
          <Col md={5}>
            <SidebarOrder />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CheckOutPage;
