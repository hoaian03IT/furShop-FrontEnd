import classNames from "classnames/bind";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { pathname } from "~/configs/path";
import { Container, Row, Col, Button } from "react-bootstrap";

import styles from "~/styles/DetailProductPage.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetailApi } from "~/api-server";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "~/components/ProductCard";
import { ProductDetail } from "~/components/ProductDetail";
import axios from "axios";
import { FeedbackModal } from "~/components/FeedbackModal";
import { IoMdStar } from "react-icons/io";

const cx = classNames.bind(styles);

const LIMIT_PRODUCT_RECOMMENDED = 5;

export default function DetailProductPage() {
    const dispatch = useDispatch();
    const { idProduct } = useParams();

    const { product } = useSelector((state) => state.product);

    const { productName, category, description } = product;

    const [suggestProducts, setSuggestProducts] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

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

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const res = await axios.get(`/api/binh-luan/lay/${idProduct}`);
                setFeedbacks(res.data.comments);
            } catch (error) {}
        };
        fetchFeedbacks();
    }, [idProduct, showFeedbackModal]);

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
                                <h4 className="text-decoration-underline text-center">Mô tả sản phẩm</h4>
                                <article className="py-4 fw-medium">{description}</article>
                            </div>
                        </Col>
                    </Row>

                    <Row className={cx("feedbacks")}>
                        <h4 className="">Đánh giá</h4>
                        {feedbacks.length > 0 ? (
                            feedbacks.map((feedback) => (
                                <Row className="my-2">
                                    <Col md={2} className="d-flex flex-column align-items-center">
                                        <img src={feedback?.customerId?.image} alt="" />
                                        <p className="limit-line-1 w-100">{feedback?.customerId?.username}</p>
                                    </Col>
                                    <Col md={10}>
                                        <div>
                                            {[...Array(feedback?.star).keys()].map(() => (
                                                <IoMdStar className="text-warning fs-5" />
                                            ))}
                                        </div>
                                        <div className="fs-6 text-black limit-line-2">{feedback?.comment}</div>
                                    </Col>
                                </Row>
                            ))
                        ) : (
                            <p className="text-center">Hiện tại không có đánh giá</p>
                        )}
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setShowFeedbackModal(true)}>Viết đánh giá</Button>
                        </div>
                    </Row>

                    <Row>
                        <Col>
                            <div className={cx("same-products", "my-5")}>
                                <h4 className="">Sản phẩm cùng loại</h4>
                                <Row md={{ cols: LIMIT_PRODUCT_RECOMMENDED }}>
                                    {suggestProducts?.slice(0, LIMIT_PRODUCT_RECOMMENDED).map((product, index) => {
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
            <FeedbackModal idProduct={idProduct} show={showFeedbackModal} onHide={() => setShowFeedbackModal(false)} />
        </div>
    );
}
