import classNames from "classnames/bind";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { pathname } from "~/configs/path";
import { Container, Row, Col } from "react-bootstrap";

import promoteImg from "~/assets/imgs/icon-product-promotion.png";

import styles from "~/styles/DetailProductPage.module.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatCurrencyVND } from "~/utils";
import { fetchProductDetailApi } from "~/api-server";
import { useDispatch, useSelector } from "react-redux";
import { PreviewImageProduct } from "~/components/PreviewImageProduct";
import { QuantityEditor } from "~/components/QuantityEditor";
import { ImFacebook, ImPinterest, ImTwitter } from "react-icons/im";
import imgProductExp1 from "~/assets/imgs/anh_sofa1.png";
import imgProductExp2 from "~/assets/imgs/anh_sofa2.png";
import { ProductCard } from "~/components/ProductCard";

const cx = classNames.bind(styles);

export default function DetailProductPage() {
    const dispatch = useDispatch();
    const { idProduct } = useParams();
    const { product } = useSelector((state) => state.product);

    const { _id, productName, description, branch, price = 0, discount = 0, attributes } = product;

    const [images, setImages] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                await fetchProductDetailApi(idProduct, dispatch);
            } catch (error) {}
        };
        fetchProduct();
    }, [dispatch, idProduct]);

    useEffect(() => {
        let imgs = [];
        attributes?.forEach((attr) => {
            if (!imgs.includes(attr.image)) imgs.push(attr.image);
        });
        setImages(imgs);
    }, [attributes]);

    useEffect(() => {
        let colorsAttr = [];
        attributes?.forEach((attr) => {
            if (!colorsAttr.includes(attr.color)) colorsAttr.push(attr.color);
        });
        setColors(colorsAttr);
    }, [attributes]);

    const handleSelectColor = (color) => {
        setSelectedColor(color);
        setSelectedSize(null);
        let sizes = [];
        attributes.forEach((attr) => {
            if (attr.color === color) sizes.push(attr.size);
        });
        setSizes(sizes);
    };

    const handleSelectSize = (size) => {
        setSelectedSize(size);
    };

    const handleIncreaseQuantity = () => {
        if (selectedQuantity !== 99) {
            setSelectedQuantity((a) => a + 1);
        }
    };

    const handleDecreaseQuantity = () => {
        if (selectedQuantity !== 1) {
            setSelectedQuantity((a) => a - 1);
        }
    };

    const handleChangeQuantityByEnter = (e) => {
        const value = e.target.value;
        if (value < 1) {
            setSelectedQuantity(1);
        } else if (value > 99) {
            setSelectedQuantity(99);
        } else {
            setSelectedQuantity(value);
        }
    };

    return (
        <div className={cx("wrapper")}>
            <BreadCrumbs
                hrefs={[
                    { path: pathname.home, name: "Trang chủ", isCurrent: false },
                    { path: "/san-pham/ban-may-tinh", name: "Bàn máy tính", isCurrent: false }, // category của sản phẩm
                    {
                        path: pathname.product, // địa chỉ sản phẩm
                        name: productName,
                        isCurrent: true,
                    },
                ]}
            />
            <Container className={cx("details")}>
                <Row md={{ cols: 2 }} className="g-5">
                    <Col>
                        <PreviewImageProduct images={images} />
                        <div className={cx("share", "d-flex align-items-center justify-content-center mt-4")}>
                            <span className="me-3">Chia sẻ</span>
                            <a href="#1" target="_blank" className={cx("social-network", "facebook")}>
                                <ImFacebook />
                            </a>
                            <a href="#2" target="_blank" className={cx("social-network", "pinterest")}>
                                <ImPinterest />
                            </a>
                            <a href="#3" target="_blank" className={cx("social-network", "twitter")}>
                                <ImTwitter />
                            </a>
                        </div>
                    </Col>
                    <Col>
                        <div className={cx("content")}>
                            <h4>{productName}</h4>
                            <div className="d-flex align-items-center">
                                <div className={cx("branch", "me-5")}>
                                    <span className={cx("label")}>Thương hiệu:</span>&nbsp;
                                    <Link to="/" className={cx("branch-name")}>
                                        {branch?.name}
                                    </Link>
                                </div>
                                <div className={cx("product-code")}>
                                    <span className={cx("label")}>Mã sản phẩm:</span>&nbsp;
                                    <span className={cx("code")}>{_id}</span>
                                </div>
                            </div>
                            <div className={cx("prices", "mt-4")}>
                                <div className="d-flex align-items-center">
                                    <span className={cx("current-price", "me-2")}>
                                        {formatCurrencyVND(price - price * discount)}
                                    </span>
                                    <span className={cx("origin-price", "me-4")}>{formatCurrencyVND(price)}</span>
                                    <span className={cx("discount", "text-danger")}>{`-${discount * 100}%`}</span>
                                </div>
                                <span className={cx("save-money")}>{`(Tiết kiệm ${formatCurrencyVND(
                                    price * discount
                                )})`}</span>
                            </div>
                            <div className={cx("promotion", "my-4")}>
                                <ul className={cx("list")}>
                                    <li className={cx("item")}>Hỗ trợ 10.000 phí Ship cho đơn hàng từ 200.000đ</li>
                                    <li className={cx("item")}>Miễn phí Ship cho đơn hàng từ 300.000đ</li>
                                    <li className={cx("item")}>Đổi trả trong 30 ngày nếu sản phẩm lỗi bất kì</li>
                                </ul>
                                <div className={cx("label", "d-flex align-items-center")}>
                                    <img className="me-1" src={promoteImg} alt="" />
                                    <span>khuyến mãi - ưu đãi</span>
                                </div>
                            </div>
                            <div className={cx("color")}>
                                <span className={cx("label")}>Màu sắc:</span>
                                <div className={cx("colors")}>
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            className={cx("color-btn", color === selectedColor ? "active" : "")}
                                            onClick={() => handleSelectColor(color)}>
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className={cx("size", "mt-4")}>
                                <span className={cx("label")}>Kích cỡ:</span>
                                <div className={cx("sizes")}>
                                    {selectedColor ? (
                                        sizes.map((size) => (
                                            <button
                                                key={size}
                                                className={cx("size-btn", selectedSize === size ? "active" : "")}
                                                onClick={() => handleSelectSize(size)}>
                                                {size}
                                            </button>
                                        ))
                                    ) : (
                                        <span>Vui lòng chọn màu</span>
                                    )}
                                </div>
                            </div>
                            <div className={cx("purchase", "mt-5")}>
                                <div className="d-flex">
                                    <div className="me-2">
                                        <QuantityEditor
                                            onIncrease={handleIncreaseQuantity}
                                            onDecrease={handleDecreaseQuantity}
                                            value={selectedQuantity}
                                            onChange={(e) => handleChangeQuantityByEnter(e)}
                                        />
                                    </div>
                                    <button className={cx("add-to-cart", "text-uppercase flex-grow-1")}>
                                        thêm vào giỏ hàng
                                    </button>
                                </div>
                                <button className={cx("buy-product", "text-uppercase mt-2")}>mua ngay</button>
                                <div className={cx("phone-contact", "text-center")}>
                                    <span>Gọi đặt mua </span>
                                    <a href="tel:+1800.0000">1800.0000</a>
                                    <span> (7:30 - 22:00)</span>
                                </div>
                            </div>
                            <button className={cx("add-to-favorite")}>
                                <span>Thêm vào yêu thích</span>
                            </button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={cx("description-product", "my-5")}>
                            <h4 className="text-decoration-underline text-center">Mô tả sản phẩm</h4>
                            <article className="py-4 fw-medium">{description}</article>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={cx("same-products", "my-5")}>
                            <h4 className="">Sản phẩm cùng loại</h4>
                            <Row>
                                <Col>
                                    <ProductCard
                                        img1={imgProductExp1}
                                        img2={imgProductExp2}
                                        title="Sofa Vải Phòng Khách Nhỏ"
                                        price={7599000}
                                        discount={0.3}
                                    />
                                </Col>
                                <Col>
                                    <ProductCard
                                        img1={imgProductExp1}
                                        img2={imgProductExp2}
                                        title="Sofa Vải Phòng Khách Nhỏ"
                                        price={7599000}
                                        discount={0.3}
                                    />
                                </Col>
                                <Col>
                                    <ProductCard
                                        img1={imgProductExp1}
                                        img2={imgProductExp2}
                                        title="Sofa Vải Phòng Khách Nhỏ"
                                        price={7599000}
                                        discount={0.3}
                                    />
                                </Col>
                                <Col>
                                    <ProductCard
                                        img1={imgProductExp1}
                                        img2={imgProductExp2}
                                        title="Sofa Vải Phòng Khách Nhỏ"
                                        price={7599000}
                                        discount={0.3}
                                    />
                                </Col>
                                <Col>
                                    <ProductCard
                                        img1={imgProductExp1}
                                        img2={imgProductExp2}
                                        title="Sofa Vải Phòng Khách Nhỏ"
                                        price={7599000}
                                        discount={0.3}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
