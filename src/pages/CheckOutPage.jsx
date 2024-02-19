import classNames from "classnames/bind";
import { pathname } from "~/configs/path";
import { Col, Container, Row } from "react-bootstrap";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { LogoCheckOut } from "~/components/CheckOutPage/LogoCheckOut";
import { SectionCheckOut } from "~/components/CheckOutPage/SectionCheckOut";
import styles from "~/styles/CheckOutPage.module.scss";

const cx = classNames.bind(styles);

function CheckOutPage() {
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
              <SectionCheckOut />
            </div>
          </Col>
          <Col md={5}>
            <div>zxxczxcczxc</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CheckOutPage;