import freeShipIcon from "~/assets/imgs/freeShipIcon.png";
import decreaseMoneyIcon from "~/assets/imgs/decreaseMoney.png";
import decreaseMoneyPercentIcon from "~/assets/imgs/decreaseMoneyPercent.png";
import styles from "~/styles/displayVoucherHomeComponent.module.scss";
import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import Voucher from "../Voucher";

const cx = classNames.bind(styles);

const listCode = [
  {
    icon: freeShipIcon,
    title: "MIỄN PHÍ VẬN CHUYỂN",
    description: "Freeship cho đơn hàng từ 500k",
    code: "EGAFREESHIP",
    expire: "30/12/2023",
    isExpired: true,
  },
  {
    icon: freeShipIcon,
    title: "MIỄN PHÍ VẬN CHUYỂN",
    description: "Freeship cho đơn hàng từ 500k",
    code: "EGAFREESHIP",
    expire: "30/12/2023",
    isExpired: true,
  },
  {
    icon: freeShipIcon,
    title: "MIỄN PHÍ VẬN CHUYỂN",
    description: "Freeship cho đơn hàng từ 500k",
    code: "EGAFREESHIP",
    expire: "30/12/2023",
    isExpired: true,
  },
  {
    icon: freeShipIcon,
    title: "MIỄN PHÍ VẬN CHUYỂN",
    description: "Freeship cho đơn hàng từ 500k",
    code: "EGAFREESHIP",
    expire: "30/12/2023",
    isExpired: true,
  },
];

function DisplayVoucher() {
  return (
    <Container>
      <Row>
        {listCode.map((item, index) => (
          <Col key={index}>
            <Voucher
              title={item.title}
              code={item.code}
              expire={item.expire}
              isExpired={item.isExpired}
              icon={item.icon}
              description={item.description}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DisplayVoucher;
