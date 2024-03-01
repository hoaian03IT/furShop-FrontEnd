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
import axios from "axios";
import { pathname } from "~/configs/path";

const cx = classNames.bind(styles);

function NewProduct() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchNewProduct = async () => {
            try {
                const res = await axios.get("api/san-pham/loc-san-pham?order=newest&pageSize=6");
                setProducts(res.data.products);
            } catch (error) {}
        };
        fetchNewProduct();
    }, [dispatch]);
    return (
        <Container>
            <Row>
                <Col>
                    <div className={cx("new-product__info")}>
                        <h3 className="mt-3 ">Sản phẩm mới</h3>
                        <Link to={pathname.product + `?order=newest`}>Đến cửa hàng</Link>
                    </div>
                </Col>
            </Row>
            <Row>
                {products.map((product) => {
                    return (
                        <Col key={product?._id}>
                            <ProductCard product={product} />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default NewProduct;
