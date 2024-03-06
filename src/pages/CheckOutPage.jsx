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
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "~/api-server";
import { useNavigate } from "react-router-dom";
import { axiosInterceptor } from "~/utils/axiosInterceptor";

const cx = classNames.bind(styles);

function CheckOutPage() {
  const [addressName, setAddressName] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [billingPhone, setbillingPhone] = useState("");
  const { user } = useSelector((state) => state.persist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = axiosInterceptor(user, dispatch, navigate);
  const { cartItems } = useSelector((state) => state.persist.cart);

  const product = useMemo(() => {
    return cartItems.reduce(
      (first, item) => [
        ...first,
        {
          productId: item.productId._id,
          productAttributeId: item.productAttributes._id,
          amount: item.amount,
        },
      ],
      []
    );
  }, []);
  const handleCheckout = async () => {
    const dataToSend = {
      customerId: user.userInfo._id,
      name: name,
      product: product,
      address: addressDetail + " " + addressName,
      phoneNumber: billingPhone,
      paymentType: "",
    };
    try {
      await createOrder(dataToSend, axiosJWT, dispatch);
      alert("Thanh toán thành công");
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };
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
                handleCheckout={handleCheckout}
                addressName={addressName}
                setAddressName={setAddressName}
                addressDetail={addressDetail}
                setAddressDetail={setAddressDetail}
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
