import styles from "~/styles/NewProductHomePageComponent.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import img1 from "~/assets/imgs/anh_sofa1.png";
import img2 from "~/assets/imgs/anh_sofa2.png";
import { Col, Container, Row } from "react-bootstrap";
import { ProductCard } from "../ProductCard";

const cx = classNames.bind(styles);

const products = [
  {
    img1: img1,
    img2: img2,
    name: "Cô đơn trên sofa sao anh yêu cô ta.",
    price: 100000,
    discount: 0.1,
  },
  {
    img1: img1,
    img2: img2,
    name: "Cô đơn trên sofa sao anh yêu cô ta.",
    price: 100000,
    discount: 0.1,
  },
  {
    img1: img1,
    img2: img2,
    name: "Cô đơn trên sofa sao anh yêu cô ta.",
    price: 100000,
    discount: 0.1,
  },
  {
    img1: img1,
    img2: img2,
    name: "Cô đơn trên sofa sao anh yêu cô ta.",
    price: 100000,
    discount: 0.1,
  },
];

function NewProduct() {
  return (
    <Container>
      <Row>
        <Col>
          <div className={cx("new-product__info")}>
            <h4>Nữ</h4>
            <h3>New Arrival</h3>
            <Link to={""}>Đến cữa hàng</Link>
          </div>
        </Col>
      </Row>
      <Row>
        {products.map((product, index) => (
          <Col>
            <ProductCard
              img1={product.img1}
              img2={product.img2}
              title={product.name}
              price={product.price}
              discount={product.discount}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default NewProduct;
