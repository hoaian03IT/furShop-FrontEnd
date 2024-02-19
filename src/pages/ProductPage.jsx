import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Container, Form, Col, Row } from "react-bootstrap";
import classNames from "classnames/bind";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { pathname } from "~/configs/path";
import { AdvertisementBanner } from "~/components/AdvertisementBanner";
import { Checkbox } from "~/components/Checkbox";
import { ProductCard } from "~/components/ProductCard";

import styles from "~/styles/ProductPage.module.scss";
import banner from "~/assets/imgs/advertisement_banner.png";
import imgProductExp1 from "~/assets/imgs/anh_sofa1.png";
import imgProductExp2 from "~/assets/imgs/anh_sofa2.png";
import { Pagination, PaginationForward, PaginationItem, PaginationPrev } from "~/components/Pagination";

const cx = classNames.bind(styles);

const branchTemp = ["Ashley", "Aaron", "French Heritage", "Khác"];
const prices = [
    {
        show: "Giá dưới 1.000.000₫",
        key: "smaller-one-million",
    },
    {
        show: "1.000.000₫ - 2.000.000₫",
        key: "one-to-two-million",
    },
    {
        show: "2.000.000₫ - 5.000.000₫",
        key: "two-to-file-million",
    },
    {
        show: "5.000.000₫ - 10.000.000₫",
        key: "five-to-ten-million",
    },
    {
        show: "Giá trên 10.000.000₫",
        key: "over-10-million",
    },
];

export default function ProductPage() {
    const [orderBy, setOrderBy] = useState(0);
    const [activePage, setActivePage] = useState(1);

    const [selectedPrice, setSelectedPrice] = useState({ checked: null });
    const [selectedBranch, setSelectedBranch] = useState([]);

    const nPageTemp = 3;

    const handleBackPage = () => {
        if (activePage > 1) setActivePage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (activePage < nPageTemp) setActivePage((prev) => prev + 1);
    };

    const handleSelectBranches = (value) => {
        if (selectedBranch.includes(value)) setSelectedBranch((prev) => prev.filter((item) => item !== value));
        else setSelectedBranch((prev) => [...prev, value]);
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
                            onChange={(e) => setOrderBy(e.target.value)}
                            value={orderBy}>
                            <option value={0}>{"Tên A -> Z"}</option>
                            <option value={1}>{"Tên Z -> A"}</option>
                            <option value={2}>Giá tăng dần</option>
                            <option value={3}>Giá giảm dần</option>
                            <option value={4}>Hàng mới</option>
                        </Form.Select>
                    </div>
                    <div className="p-2">
                        <Row>
                            <Col md={3}>
                                <div className={cx("part-filter")}>
                                    <h6 className="text-uppercase">thương hiệu</h6>
                                    <div>
                                        {branchTemp.map((branch) => (
                                            <Checkbox
                                                key={branch}
                                                label={branch}
                                                checked={selectedBranch.includes(branch)}
                                                onChange={() => handleSelectBranches(branch)}
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
                                                checked={price.key === selectedPrice}
                                                onChange={() => setSelectedPrice(price.key)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className={cx("part-filter")}>
                                    <h6 className="text-uppercase">loại</h6>
                                    <div>
                                        <NavLink
                                            to={pathname.product}
                                            className={({ isActive }) => cx("link", isActive ? "active" : "")}>
                                            Bàn
                                        </NavLink>
                                        <NavLink
                                            to={"/"}
                                            className={({ isActive }) => cx("link", isActive ? "active" : "")}>
                                            Ghế
                                        </NavLink>
                                        <NavLink
                                            to={"/"}
                                            className={({ isActive }) => cx("link", isActive ? "active" : "")}>
                                            Tủ
                                        </NavLink>
                                        <NavLink
                                            to={"/"}
                                            className={({ isActive }) => cx("link", isActive ? "active" : "")}>
                                            Giường
                                        </NavLink>
                                        <NavLink
                                            to={"/"}
                                            className={({ isActive }) => cx("link", isActive ? "active" : "")}>
                                            Khăn màn rèm
                                        </NavLink>
                                        <NavLink
                                            to={"/"}
                                            className={({ isActive }) => cx("link", isActive ? "active" : "")}>
                                            Đồ da dụng
                                        </NavLink>
                                    </div>
                                </div>
                            </Col>
                            <Col md={9}>
                                <Row md={{ cols: 4 }}>
                                    {"hoaian03".split("").map((c, index) => (
                                        <Col className="mt-4" key={index}>
                                            <div>
                                                <ProductCard
                                                    img1={imgProductExp1}
                                                    img2={imgProductExp2}
                                                    title="Sofa Vải Phòng Khách Nhỏ"
                                                    price={7599000}
                                                    discount={0.3}
                                                />
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                                <div className="mt-4">
                                    <Pagination placement="right">
                                        <PaginationPrev onClick={handleBackPage} />
                                        {[...Array(nPageTemp + 1).keys()].slice(1).map((value) => (
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
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </div>
    );
}
