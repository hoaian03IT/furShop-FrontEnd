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
<<<<<<< HEAD
=======
import {
    Pagination,
    PaginationEllipsis,
    PaginationForward,
    PaginationItem,
    PaginationPrev,
} from "~/components/Pagination";
>>>>>>> ffc3ca59e1585fdd9dc5d96f21e1d9ad99a49502

const cx = classNames.bind(styles);

export default function ProductPage() {
    const [orderBy, setOrderBy] = useState(0);
    const [checked, setChecked] = useState(false);
<<<<<<< HEAD
=======
    const [activePage, setActivePage] = useState(1);
    const nPageTemp = 3;
>>>>>>> ffc3ca59e1585fdd9dc5d96f21e1d9ad99a49502

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
                                        <Checkbox
                                            label="Ashley"
                                            checked={checked}
                                            onChange={(e) => setChecked(e.target.checked)}
                                        />
                                        <Checkbox
                                            label="Aaron"
                                            checked={checked}
                                            onChange={(e) => setChecked(e.target.checked)}
                                        />
                                        <Checkbox
                                            label="French Heritage"
                                            checked={checked}
                                            onChange={(e) => setChecked(e.target.checked)}
                                        />
                                        <Checkbox
                                            label="Khác"
                                            checked={checked}
                                            onChange={(e) => setChecked(e.target.checked)}
                                        />
                                    </div>
                                </div>
                                <div className={cx("part-filter")}>
                                    <h6 className="text-uppercase">mức giá </h6>
                                    <div>
                                        <Checkbox
                                            label="Giá dưới 1.000.000₫"
                                            checked={checked}
                                            onChange={(e) => setChecked(e.target.checked)}
                                        />
                                        <Checkbox
                                            label="1.000.000₫ - 2.000.000₫"
                                            checked={checked}
                                            onChange={(e) => setChecked(e.target.checked)}
                                        />
                                        <Checkbox
                                            label="2.000.000₫ - 3.000.000₫"
                                            checked={checked}
                                            onChange={(e) => setChecked(e.target.checked)}
                                        />
                                        <Checkbox
                                            label="3.000.000₫ - 5.000.000₫"
                                            checked={checked}
                                            onChange={(e) => setChecked(e.target.checked)}
                                        />
                                        <Checkbox
                                            label="Giá trên 10.000.000₫"
                                            checked={checked}
                                            onChange={(e) => setChecked(e.target.checked)}
                                        />
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
<<<<<<< HEAD
                                    {"hoaian03".split("").map(() => (
                                        <Col className="mt-4">
=======
                                    {"hoaian03".split("").map((c, index) => (
                                        <Col className="mt-4" key={index}>
>>>>>>> ffc3ca59e1585fdd9dc5d96f21e1d9ad99a49502
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
<<<<<<< HEAD
=======
                                <div>
                                    <Pagination placement="right">
                                        <PaginationPrev />
                                        {[...Array(nPageTemp + 1).keys()].slice(1).map((value) => (
                                            <PaginationItem key={value} active={value === activePage}>
                                                {value}
                                            </PaginationItem>
                                        ))}
                                        <PaginationForward />
                                    </Pagination>
                                </div>
>>>>>>> ffc3ca59e1585fdd9dc5d96f21e1d9ad99a49502
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </div>
    );
}
