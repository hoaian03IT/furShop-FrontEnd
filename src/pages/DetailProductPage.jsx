import classNames from "classnames/bind";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { pathname } from "~/configs/path";
import { Container, Row, Col } from "react-bootstrap";

import promoteImg from "~/assets/imgs/icon-product-promotion.png";

import styles from "~/styles/DetailProductPage.module.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatCurrencyVND } from "~/utils";
import { fetchListProductApi, fetchProductDetailApi } from "~/api-server";
import { useDispatch, useSelector } from "react-redux";
import { PreviewImageProduct } from "~/components/PreviewImageProduct";
import { QuantityEditor } from "~/components/QuantityEditor";
import { ImFacebook, ImPinterest, ImTwitter } from "react-icons/im";
import { ProductCard } from "~/components/ProductCard";
import { addProductToCartFailed, addProductToCartRequest, addProductToCartSuccess } from "~/app/slices/cartSlide";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

const LIMIT_PRODUCT_RECOMMENDED = 5;

export default function DetailProductPage() {
    const dispatch = useDispatch();
    const { idProduct } = useParams();

    const { product } = useSelector((state) => state.product);
    const { products } = useSelector((state) => state.listProduct);

    const { _id, productName, category, description, branch, price = 0, discount = 0, attributes } = product;

    const [images, setImages] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [stock, setStock] = useState(0);

    const [selectedAttributes, setSelectedAttributes] = useState({
        _id: "",
        size: "",
        color: "",
        quantity: 0,
        image: "",
    });

    // fetch product by id
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                await fetchProductDetailApi(idProduct, dispatch);
            } catch (error) {}
        };
        fetchProduct();
    }, [dispatch, idProduct]);

    // push images of products to state
    useEffect(() => {
        let imgs = [];
        attributes?.forEach((attr) => {
            if (!imgs.includes(attr.image)) imgs.push(attr.image);
        });
        setImages(imgs);
    }, [attributes]);

    // filter colors of products
    useEffect(() => {
        let colorsAttr = [];
        attributes?.forEach((attr) => {
            if (!colorsAttr.includes(attr.color)) colorsAttr.push(attr.color);
        });
        setColors(colorsAttr);
    }, [attributes]);

    // cap nhat stock, image va _id cua attribute khi da chon size va mau cua san pham
    useEffect(() => {
        const selected = attributes?.filter(
            (attr) => attr.color === selectedAttributes.color && attr.size === selectedAttributes.size
        )[0];
        const stockProduct = selectedAttributes.size ? selected.quantity : 0;
        setStock(stockProduct);
        setSelectedAttributes({ ...selectedAttributes, image: selected?.image, _id: selected?._id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attributes, selectedAttributes.size]);

    useEffect(() => {
        const fetchProductRelated = async (query) => {
            try {
                await fetchListProductApi(query, dispatch);
            } catch (error) {}
        };
        category?._id && fetchProductRelated(`category=${category?._id}&pageSize=${LIMIT_PRODUCT_RECOMMENDED}`);
    }, [category, dispatch]);

    const handleSelectColor = (color) => {
        setSelectedAttributes({ ...selectedAttributes, color: color, size: "" });
        let sizes = [];
        attributes.forEach((attr) => {
            if (attr.color === color) sizes.push(attr.size);
        });
        setSizes(sizes);
    };

    const handleSelectSize = (size) => {
        setSelectedAttributes({ ...selectedAttributes, size: size });
    };

    const handleIncreaseQuantity = () => {
        if (selectedAttributes.size) {
            if (selectedAttributes.quantity !== stock) {
                setSelectedAttributes({ ...selectedAttributes, quantity: selectedAttributes.quantity + 1 });
            }
        }
    };

    const handleDecreaseQuantity = () => {
        if (selectedAttributes.size) {
            if (selectedAttributes.quantity !== 1) {
                setSelectedAttributes({ ...selectedAttributes, quantity: selectedAttributes.quantity - 1 });
            }
        }
    };

    const handleChangeQuantityByEnter = (e) => {
        const value = e.target.value;
        if (value < 1) {
            setSelectedAttributes({ ...selectedAttributes, quantity: 1 });
        } else if (value > stock) {
            setSelectedAttributes({ ...selectedAttributes, quantity: stock });
        } else {
            setSelectedAttributes({ ...selectedAttributes, quantity: value });
        }
    };

    const handleAddToCart = () => {
        if (selectedAttributes.color && selectedAttributes.size && selectedAttributes.quantity) {
            try {
                const addedProduct = { ...product, attributes: [selectedAttributes] };
                dispatch(addProductToCartRequest());
                dispatch(addProductToCartSuccess(addedProduct));
                toast.success("Đã thêm sản phẩm vào giỏ hàng");
            } catch (error) {
                dispatch(addProductToCartFailed(error.message));
            }
        } else {
            toast.error("Vui lòng chọn màu sắc, kích thước và số lượng sản phẩm!");
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
            {Object.keys(product).length > 0 ? (
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
                                                className={cx(
                                                    "color-btn",
                                                    color === selectedAttributes.color ? "active" : ""
                                                )}
                                                onClick={() => handleSelectColor(color)}>
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className={cx("size", "mt-4")}>
                                    <span className={cx("label")}>Kích cỡ:</span>
                                    <div className={cx("sizes")}>
                                        {selectedAttributes.color ? (
                                            sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    className={cx(
                                                        "size-btn",
                                                        selectedAttributes.size === size ? "active" : ""
                                                    )}
                                                    onClick={() => handleSelectSize(size)}>
                                                    {size}
                                                </button>
                                            ))
                                        ) : (
                                            <span>Vui lòng chọn màu</span>
                                        )}
                                    </div>
                                    <div className={cx("stock", "mt-4")}>
                                        <span className={cx("label")}>Số lượng:</span>
                                        <span>{selectedAttributes.size ? stock : 0}</span>
                                    </div>
                                </div>
                                <div className={cx("purchase", "mt-5")}>
                                    <div className="d-flex">
                                        <div className="me-2">
                                            <QuantityEditor
                                                onIncrease={handleIncreaseQuantity}
                                                onDecrease={handleDecreaseQuantity}
                                                value={selectedAttributes.quantity}
                                                onChange={(e) => handleChangeQuantityByEnter(e)}
                                            />
                                        </div>
                                        <button
                                            className={cx("add-to-cart", "text-uppercase flex-grow-1")}
                                            onClick={handleAddToCart}>
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
                                <Row md={{ cols: LIMIT_PRODUCT_RECOMMENDED }}>
                                    {products?.slice(0, LIMIT_PRODUCT_RECOMMENDED).map((product, index) => {
                                        const imgs = product?.attributes.map((attr) => attr.image);
                                        return (
                                            <Col key={index}>
                                                <ProductCard
                                                    imgs={imgs}
                                                    title={product?.productName}
                                                    price={product?.price}
                                                    discount={product?.discount}
                                                    link={pathname.productDetail.split(":")[0] + product?._id}
                                                />
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
