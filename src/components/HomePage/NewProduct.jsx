import styles from "~/styles/NewProductHomePageComponent.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import img1 from "~/assets/imgs/anh_sofa1.png";
import img2 from "~/assets/imgs/anh_sofa2.png";
import { Col, Container, Row } from "react-bootstrap";
import { ProductCard } from "../ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchNewProduct } from "~/api-server";

const cx = classNames.bind(styles);

function NewProduct() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const data = await fetchNewProduct(dispatch, 4);
      setProducts(data?.data || []);
    })();
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <div className={cx("new-product__info")}>
            <h3 className="mt-3 ">Sản phẩm mới</h3>
            <Link to={""}>Đến cữa hàng</Link>
          </div>
        </Col>
      </Row>
      <Row>
        {products.map((product, index) => (
          <Col key={index}>
            <ProductCard
              img1={product.image[0] || ""}
              img2={product.image[1] || ""}
              title={product.productName}
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
