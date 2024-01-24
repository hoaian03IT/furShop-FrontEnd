import classNames from "classnames/bind";
import { Container, Col, Row } from "react-bootstrap";
import { Search } from "../Search";
import { LogoHeader } from "./LogoHeader";
import { InteractionGroupBtn } from "./InteractionGroupBtn";
import { NavbarItem } from "./NavbarItem";

import styles from "~/styles/Header.module.scss";
import { createContext, useState } from "react";

const cx = classNames.bind(styles);

const navbarCategories = [
    {
        title: "sản phẩm",
        path: "/san-pham",
        fullScreenPopper: true,
        children: [
            {
                title: "bàn",
                list: [
                    { title: "bàn tròn", path: "/" },
                    { title: "bàn máy tính", path: "/" },
                    { title: "bàn học", path: "/" },
                ],
            },
            {
                title: "ghế",
                list: [
                    { title: "ghế sofa", path: "/" },
                    { title: "ghế nhựa", path: "/" },
                    { title: "ghế công thái học", path: "/" },
                ],
            },
            {
                title: "tủ",
                list: [
                    { title: "tủ giày", path: "/" },
                    { title: "tủ quần áo", path: "/" },
                    { title: "ghế bếp", path: "/" },
                ],
            },
            {
                title: "giường",
                list: [
                    { title: "giường đơn", path: "/" },
                    { title: "giường đôi", path: "/" },
                ],
            },
        ],
    },
    {
        title: "phụ kiện",
        path: "/phu-kien",
        fullScreenPopper: true,
        children: [
            {
                title: "khăn, màn, rèm",
                list: [
                    { title: "khăn bàn", path: "/khan-ban" },
                    { title: "màn ngủ", path: "/man-ngu" },
                    { title: "rèm cửa", path: "/rem-cua" },
                ],
            },
            {
                title: "đồ da dụng",
                list: [
                    { title: "bộ dao kéo", path: "/bo-dao-keo" },
                    { title: "nồi chảo", path: "/noi-chao" },
                    { title: "bát đũa", path: "/bat-dua" },
                ],
            },
        ],
    },
    {
        title: "khuyến mãi",
        path: "/khuyen-mai",
    },
    {
        title: "liên hệ",
        path: "/lien-he",
    },
    {
        title: "chính sách",
        path: "/chinh-sach",
    },
];

export const HeaderContext = createContext();

export const Header = () => {
    const [showSearchOffCanvas, setShowSearchOffCanvas] = useState(false);

    return (
        <HeaderContext.Provider value={{ showSearchOffCanvas, setShowSearchOffCanvas }}>
            <div className={cx("wrapper")}>
                <Container className="h-100 overflow-hidden">
                    <Row className="h-100 align-items-center">
                        <Col md={3} className={cx("logo")}>
                            <LogoHeader />
                        </Col>
                        <Col md={6} className={cx("navbar")}>
                            {navbarCategories.map((category, index) => (
                                <NavbarItem
                                    key={index}
                                    path={category.path}
                                    title={category.title}
                                    fullScreenPopper={category.fullScreenPopper}
                                    list={category.children}
                                />
                            ))}
                        </Col>
                        <Col md={3}>
                            <InteractionGroupBtn />
                        </Col>
                    </Row>
                </Container>
                <Search />
            </div>
        </HeaderContext.Provider>
    );
};
