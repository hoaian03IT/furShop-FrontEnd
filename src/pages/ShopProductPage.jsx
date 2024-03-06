import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { CiShop } from "react-icons/ci";
import { BsShop } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { pathname } from "~/configs/path";
import { useParams } from "react-router-dom";
import { ProductCard } from "~/components/ProductCard";
import axios from "axios";
import styles from "~/styles/ShopProductPage.module.scss";

import gucciImg from "~/assets/imgs/gucci-logo.png";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const tabContent = [
    { label: "Mới nhất", key: "newest" },
    { label: "Tất cả", key: "all" },
    { label: "Giảm sâu", key: "sale" },
];

export default function ShopProductPage() {
    const { tagname } = useParams();

    const [activeTab, setActiveTab] = useState(tabContent[0].key);
    const [loading, setLoading] = useState(false);

    const [shopInfo, setShopInfo] = useState({
        info: null,
        products: [],
    });

    useEffect(() => {
        const fetchShopInfo = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/api/cua-hang/thong-tin?tagname=${tagname}&filter=${activeTab}`);
                const { shopInfo, products } = res.data;
                setShopInfo({
                    info: shopInfo,
                    products: products,
                });
            } catch (error) {
                toast.error(error?.response.data.message || error?.message);
            }
            setLoading(false);
        };
        fetchShopInfo();
    }, [tagname, activeTab]);

    return (
        <div className={cx("wrapper")}>
            <BreadCrumbs
                hrefs={[
                    {
                        path: pathname.home,
                        name: "Trang chủ",
                    },
                    {
                        path: pathname.shop + "/123",
                        name: "Cửa hàng",
                        isCurrent: true,
                    },
                ]}
            />
            <Container className={cx("info")}>
                <Row>
                    <Col className={cx("info-shop")} md={4}>
                        <div className={cx("background")}>
                            <img src={shopInfo.info?.backgroundImage} alt="" />
                        </div>
                        <div className={cx("details")}>
                            <h5>Cửa hàng</h5>
                            <div className="d-flex align-items-center">
                                <CiShop className="fs-2" />
                                <span className="fs-5 fw-semibold">{shopInfo.info?.name}</span>
                            </div>
                            <div className="d-flex align-items-start mt-2">
                                <div className={cx("avatar-wrapper")}>
                                    <img src={gucciImg} alt="username-shop" />
                                </div>
                                <span className={cx("username", "pt-2 ms-2 fw-normal")}>{shopInfo.info?.tagname}</span>
                            </div>
                        </div>
                    </Col>
                    <Col md={8} className={cx("info-shop-product")}>
                        <Row md={{ cols: 2 }}>
                            <Col className="ps-5 d-flex flex-column justify-content-between">
                                <div className={cx("item")}>
                                    <BsShop />
                                    <span className={cx("label")}>Sản phẩm:</span>
                                    <span className={cx("value")}>{shopInfo.info?.totalProduct}</span>
                                </div>
                            </Col>
                            <Col className="d-flex flex-column justify-content-between">
                                <div className={cx("item")}>
                                    <BsShop />
                                    <span className={cx("label")}>Đã bán:</span>
                                    <span className={cx("value")}>{shopInfo.info?.sold}</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Container className={cx("product")}>
                <ul className={cx("tabs")}>
                    {tabContent.map((item) => (
                        <li key={item.key} className={cx("tab", activeTab === item.key ? "active" : "")}>
                            <button className={cx("tab-btn")} onClick={() => setActiveTab(item.key)}>
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <Row md={{ cols: 4 }}>
                    {shopInfo.products.map((item) => (
                        <Col key={item._id}>
                            <ProductCard product={item} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
