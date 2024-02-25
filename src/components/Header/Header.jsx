import classNames from "classnames/bind";
import { Container, Col, Row } from "react-bootstrap";
import { Search } from "../Search";
import { LogoHeader } from "./LogoHeader";
import { InteractionGroupBtn } from "./InteractionGroupBtn";
import { NavbarItem } from "./NavbarItem";
import { useSelector } from "react-redux";

import styles from "~/styles/Header.module.scss";
import { createContext, useEffect, useState } from "react";
import { pathname } from "~/configs/path";

const cx = classNames.bind(styles);

export const HeaderContext = createContext();

export const Header = () => {
    const { categories } = useSelector((state) => state.persist.category);

    const [showSearchOffCanvas, setShowSearchOffCanvas] = useState(false);

    const [productCategories, setProductCategories] = useState([]);
    const [accessoryCategories, setAccessoryCategories] = useState([]);

    useEffect(() => {
        let children = [];
        // filter bàn
        let productcategories = [];
        categories.forEach((category) => {
            if (category.name.includes("Bàn"))
                productcategories.push({ title: category.name, path: pathname.product + `?category=${category._id}` });
        });
        children.push({ title: "bàn", list: productcategories });

        // filter ghế
        productcategories = [];
        categories.forEach((category) => {
            if (category.name.includes("Ghế"))
                productcategories.push({ title: category.name, path: pathname.product + `?category=${category._id}` });
        });
        children.push({ title: "ghế", list: productcategories });

        // filter tủ
        productcategories = [];
        categories.forEach((category) => {
            if (category.name.includes("Tủ"))
                productcategories.push({ title: category.name, path: pathname.product + `?category=${category._id}` });
        });
        children.push({ title: "tủ", list: productcategories });

        // filter giường
        productcategories = [];
        categories.forEach((category) => {
            if (category.name.includes("Giường"))
                productcategories.push({ title: category.name, path: pathname.product + `?category=${category._id}` });
        });
        children.push({ title: "giường", list: productcategories });
        setProductCategories(children);
    }, [categories]);

    useEffect(() => {
        let children = [];
        // filter khăn màn rèm
        let accessorycategories = [];
        categories.forEach((category) => {
            if (category.name.includes("Khăn") || category.name.includes("Màn") || category.name.includes("Rèm"))
                accessorycategories.push({
                    title: category.name,
                    path: pathname.product + `?category=${category._id}`,
                });
        });
        children.push({ title: "khăn, màn, rèm", list: accessorycategories });

        // filter gối đệm thảm
        accessorycategories = [];
        categories.forEach((category) => {
            if (category.name.includes("Gối") || category.name.includes("Đệm") || category.name.includes("Thảm"))
                accessorycategories.push({
                    title: category.name,
                    path: pathname.product + `?category=${category._id}`,
                });
        });
        children.push({ title: "ghế", list: accessorycategories });

        // filter dao kéo dĩa
        accessorycategories = [];
        categories.forEach((category) => {
            if (
                category.name.includes("dao" || category.name.includes("kéo")) ||
                category.name.includes("dĩa") ||
                category.name.includes("nồi") ||
                category.name.includes("chảo")
            )
                accessorycategories.push({
                    title: category.name,
                    path: pathname.product + `?category=${category._id}`,
                });
        });
        children.push({ title: "Đồ da dụng", list: accessorycategories });

        setAccessoryCategories(children);
    }, [categories]);

    return (
        <HeaderContext.Provider value={{ showSearchOffCanvas, setShowSearchOffCanvas }}>
            <div className={cx("wrapper")}>
                <Container className="h-100 overflow-hidden">
                    <Row className="h-100 align-items-center">
                        <Col md={3} className={cx("logo")}>
                            <LogoHeader />
                        </Col>
                        <Col md={6} className={cx("navbar")}>
                            <NavbarItem
                                path={pathname.product}
                                title={"sản phẩm"}
                                fullScreenPopper={true}
                                list={productCategories}
                            />
                            <NavbarItem
                                path={"/tmp"}
                                disablePath={true}
                                title={"phụ kiện"}
                                fullScreenPopper={true}
                                list={accessoryCategories}
                            />
                            <NavbarItem path={"/khuyen-mai"} title={"Khuyễn mãi"} />
                            <NavbarItem path={"/lien-he"} title={"liên hệ"} />
                            <NavbarItem path={pathname.policy} title={"chính sách"} />
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
