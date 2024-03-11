import classNames from "classnames/bind";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { pathname } from "~/configs/path";
import { Container, Row, Col } from "react-bootstrap";

import styles from "~/styles/DetailProductPage.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetailApi } from "~/api-server";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "~/components/ProductCard";
import { ProductDetail } from "~/components/ProductDetail";
import axios from "axios";

const cx = classNames.bind(styles);

const LIMIT_PRODUCT_RECOMMENDED = 5;

export default function DetailProductPage() {
  const dispatch = useDispatch();
  const { idProduct } = useParams();

  const { product } = useSelector((state) => state.product);

  const { productName, category, description } = product;

  const [suggestProducts, setSuggestProducts] = useState([]);

  // fetch product by id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await fetchProductDetailApi(idProduct, dispatch);
      } catch (error) {}
    };
    fetchProduct();
  }, [dispatch, idProduct]);

  // fetch suggested products
  useEffect(() => {
    const fetchProductRelated = async () => {
      try {
        const res = await axios.get(
          `/api/san-pham/loc-san-pham?category=${category?._id}&pageSize=${LIMIT_PRODUCT_RECOMMENDED}`
        );
        setSuggestProducts(res.data.products);
      } catch (error) {}
    };
    category?._id && fetchProductRelated();
  }, [category, dispatch]);

  return (
    <div className={cx("wrapper")}>
      <BreadCrumbs
        hrefs={[
          { path: pathname.home, name: "Trang chủ", isCurrent: false },
          {
            path: pathname.product + `?category=${product.category?._id}`,
            name: product.category?.name,
            isCurrent: false,
          }, // category của sản phẩm
          {
            path: pathname.product, // địa chỉ sản phẩm
            name: productName,
            isCurrent: true,
          },
        ]}
      />
      {Object.keys(product).length > 0 ? (
        <Container className={cx("details")}>
          <ProductDetail product={product} />
          <Row>
            <Col>
              <div className={cx("description-product", "my-5")}>
                <h4 className="text-decoration-underline text-center">
                  Mô tả sản phẩm
                </h4>
                <article className="py-4 fw-medium">{description}</article>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={cx("same-products", "my-5")}>
                <h4 className="">Sản phẩm cùng loại</h4>
                <Row md={{ cols: LIMIT_PRODUCT_RECOMMENDED }}>
                  {suggestProducts
                    ?.slice(0, LIMIT_PRODUCT_RECOMMENDED)
                    .map((product, index) => {
                      return (
                        <Col key={index}>
                          <ProductCard product={product} />
                        </Col>
                      );
                    })}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <span className="m-auto">Sản phẩm không tồn tại</span>
      )}
    </div>
  );
}
