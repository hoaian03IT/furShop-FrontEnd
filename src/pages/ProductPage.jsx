import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Form, Col, Row } from "react-bootstrap";
import classNames from "classnames/bind";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { pathname } from "~/configs/path";
import { AdvertisementBanner } from "~/components/AdvertisementBanner";
import { Checkbox } from "~/components/Checkbox";
import { ProductCard } from "~/components/ProductCard";
import { Pagination, PaginationForward, PaginationItem, PaginationPrev } from "~/components/Pagination";
import { fetchBrandsApi, fetchListProductApi } from "~/api-server";
import { useSelector, useDispatch } from "react-redux";

import banner from "~/assets/imgs/advertisement_banner.png";
import styles from "~/styles/ProductPage.module.scss";
import { Loading } from "~/components/Loading";

const cx = classNames.bind(styles);

const prices = [
    {
        show: "Giá dưới 1.000.000₫",
        key: "0-999999",
    },
    {
        show: "1.000.000₫ - 2.000.000₫",
        key: "1000000-1999999",
    },
    {
        show: "2.000.000₫ - 5.000.000₫",
        key: "2000000-4999999",
    },
    {
        show: "5.000.000₫ - 10.000.000₫",
        key: "5000000-9999999",
    },
    {
        show: "Giá trên 10.000.000₫",
        key: "over-10000000",
    },
];

const ORDER = [
    {
        key: "asc",
        label: "Tên A -> Z",
    },
    {
        key: "desc",
        label: "Tên Z -> A",
    },
    {
        key: "lowest",
        label: "Giá tăng dần",
    },
    {
        key: "highest",
        label: "Giá giảm dần",
    },

    {
        key: "newest",
        label: "Hàng mới",
    },
];

const nPageTemp = 8;

export default function ProductPage() {
    const dispatch = useDispatch();
    const { products, pages, loading: loadingProducts } = useSelector((state) => state.listProduct);
    const { brands } = useSelector((state) => state.persist.brand);

    const [activePage, setActivePage] = useState(1);

    const { search } = useLocation();

    const sp = new URLSearchParams(search);

    const [categoryFilter, setCategoryFilter] = useState(sp.get("category") || "all");
    const [brandFilter, setBrandFilter] = useState(sp.get("branch") || "all");
    const [priceFilter, setPriceFilter] = useState(sp.get("price") || "all");
    const [order, setOrder] = useState(sp.get("order") || "asc");

    useEffect(() => {
        const fetchBrands = async () => {
            await fetchBrandsApi(5, dispatch);
        };
        fetchBrands();
    }, [dispatch]);

    useEffect(() => {
        const fetchListProduct = async () => {
            await fetchListProductApi(
                `category=${categoryFilter}&order=${order}&brand=${brandFilter}&price=${priceFilter}&pageSize=${nPageTemp}&page=${activePage}`,
                dispatch
            );
        };
        fetchListProduct();
    }, [activePage, brandFilter, categoryFilter, dispatch, order, priceFilter]);

    const handleBackPage = () => {
        if (activePage > 1) setActivePage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (activePage < pages) setActivePage((prev) => prev + 1);
    };

    const handleFilterPrice = (value) => {
        if (priceFilter === value) setPriceFilter("all");
        else setPriceFilter(value);
    };

    return (
        <div className={cx("wrapper")}>
            <BreadCrumbs
                hrefs={[
                    { path: pathname.home, name: "Trang chủ", isCurrent: false },
                    {
                        path: pathname.product,
                        name: "Tất cả sản phẩm",
                        isCurrent: true,
                    },
                ]}
            />
            <Container>
                <AdvertisementBanner img={banner} link="/" />
            </Container>
            <Container className="mt-5">
                <div className={cx("products")}>
                    <div className="d-flex align-items-center justify-content-between">
                        <h5>Tất cả sản phẩm</h5>
                        <Form.Select
                            className={cx("order-selection")}
                            onChange={(e) => setOrder(e.target.value)}
                            value={order}>
                            {ORDER.map((item) => (
                                <option key={item.key} value={item.key}>
                                    {item.label}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className="p-2">
                        <Row>
                            <Col md={3}>
                                <div className={cx("part-filter")}>
                                    <h6 className="text-uppercase">thương hiệu</h6>
                                    <div>
                                        <Checkbox
                                            label="Tất cả"
                                            checked={brandFilter === "all"}
                                            onChange={() => setBrandFilter("all")}
                                        />
                                        {brands?.map((brand) => (
                                            <Checkbox
                                                key={brand?._id}
                                                label={brand?.name}
                                                checked={brandFilter === brand?._id}
                                                onChange={() => setBrandFilter(brand._id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className={cx("part-filter")}>
                                    <h6 className="text-uppercase">mức giá </h6>
                                    <div>
                                        {prices.map((price) => (
                                            <Checkbox
                                                key={price.key}
                                                label={price.show}
                                                checked={price.key === priceFilter}
                                                onChange={() => handleFilterPrice(price.key)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Col>
                            <Col md={9}>
                                <Row md={{ cols: 4 }}>
                                    {loadingProducts ? (
                                        <Loading />
                                    ) : (
                                        products.map((product) => {
                                            const imgs = product?.attributes.map((attr) => attr.image);
                                            return (
                                                <Col className="mt-4" key={product?._id}>
                                                    <div>
                                                        <ProductCard
                                                            imgs={imgs}
                                                            title="Sofa Vải Phòng Khách Nhỏ"
                                                            price={product?.price}
                                                            discount={product?.discount}
                                                            link={pathname.productDetail.split(":")[0] + product._id}
                                                        />
                                                    </div>
                                                </Col>
                                            );
                                        })
                                    )}
                                </Row>
                                {pages > 1 && (
                                    <div className="mt-4">
                                        <Pagination placement="right">
                                            <PaginationPrev onClick={handleBackPage} />
                                            {[...Array(pages + 1).keys()].slice(1).map((value) => (
                                                <PaginationItem
                                                    key={value}
                                                    active={value === activePage}
                                                    onClick={() => setActivePage(value)}>
                                                    {value}
                                                </PaginationItem>
                                            ))}
                                            <PaginationForward onClick={handleNextPage} />
                                        </Pagination>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </div>
    );
}
