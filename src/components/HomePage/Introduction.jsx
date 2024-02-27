import classNames from "classnames/bind";
import styles from "../../styles/IntroducttionHomePageComponent.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Cards from "./Introduction.Card";
import { MdOutlineLocalShipping } from "react-icons/md";
import { HiOutlineGift } from "react-icons/hi2";
import { GrCertificate } from "react-icons/gr";
import { LuContact2 } from "react-icons/lu";
import { imageCatalory } from "./image";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const listCard = [
  {
    Icon: <MdOutlineLocalShipping />,
    title: "Miễn phí vận chuyển",
    description: "Nhận hàng trong vòng 3 ngày",
  },
  {
    Icon: <HiOutlineGift />,
    title: "Quà tặng hấp dẫn",
    description: "Nhiều ưu đãi khuyến mãi hot",
  },
  {
    Icon: <GrCertificate />,
    title: "Bảo đảm chất lượng",
    description: "Sản phẩm đã dược kiểm định",
  },
  {
    Icon: <LuContact2 />,
    title: "Hotline: 19001993",
    description: "Dịch vụ hỗ trợ bạn 24/7",
  },
];
const listCatalory = [
  {
    Icon: <img className={cx("img-catalory")} src={imageCatalory.bowl} />,
    title: "Bát đĩa",
    description: "200 sản phẩm",
  },
  {
    Icon: <img className={cx("img-catalory")} src={imageCatalory.bowl} />,
    title: "Xoong nồi",
    description: "300 sản phẩm",
  },
  {
    Icon: <img className={cx("img-catalory")} src={imageCatalory.bowl} />,
    title: "Dao kéo",
    description: "500 sản phẩm",
  },
  {
    Icon: <img className={cx("img-catalory")} src={imageCatalory.bowl} />,
    title: "Đũa muỗng",
    description: "1000 sản phẩm",
  },
  {
    Icon: <img className={cx("img-catalory")} src={imageCatalory.bowl} />,
    title: "Bếp ga",
    description: "250 sản phẩm",
  },
  {
    Icon: <img className={cx("img-catalory")} src={imageCatalory.bowl} />,
    title: "Bếp từ",
    description: "233 sản phẩm",
  },
];
function Introduction() {
  const { categories } = useSelector((state) => state.persist.category);
  let listCatalory = [...categories];
  listCatalory = categories.slice(0, 6);
  return (
    <Container>
      <Row className={cx("mt-5")}>
        {listCard.map((item, index) => (
          <Col key={index}>
            <Cards
              Icon={item.Icon}
              title={item.title}
              description={item.description}
              border
              borderIcon
            />
          </Col>
        ))}
      </Row>
      <Row className={cx("mt-5", "pb-5")}>
        {listCatalory.map((item, index) => (
          <Col key={index}>
            <Cards
              cursor
              hover
              className={cx("cover-image")}
              style={{
                maxHeight: "270px",
                height: "270px",
                backgroundColor: "rgb(246,246,246)",
              }}
              Icon={<img className={cx("img-catalory")} src={item.image} />}
              title={item.name}
              description={`Còn ${item.quantity} sản phẩm`}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Introduction;
