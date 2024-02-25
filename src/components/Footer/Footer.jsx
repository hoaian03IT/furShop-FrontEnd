import classNames from "classnames/bind";
import { Container, Col, Row } from "react-bootstrap";
import { GiPositionMarker } from "react-icons/gi";
import React from "react";
import styles from "~/styles/Footer.module.scss";
import { LogoHeader } from "../Header/LogoHeader";
import { IoIosPhonePortrait, IoIosMail } from "react-icons/io";
import { AiFillFacebook, AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { SiZalo } from "react-icons/si";

const cx = classNames.bind(styles);

//export const FooterContext = createContext();

const address = {
    Icon: <GiPositionMarker />,
    title: "Địa chỉ: 123 Quang Trung, Thanh Khê, Đà Nẵng",
};

const phone = {
    Icon: <IoIosPhonePortrait />,
    title: "Số điện thoại: 19006750",
};

const email = {
    Icon: <IoIosMail />,
    title: "Email: support@furshop.vn",
};

const navbar = [
    {
        title: "Hỗ Trợ Khách Hàng",
        children: [
            {
                title: "Tìm Kiếm",
                path: "/tim-kiem",
            },

            {
                title: "Giới Thiệu",
                path: "/gioi-thieu",
            },

            {
                title: "Liên Hệ",
                path: "/lien-he",
            },

            {
                title: "Cửa Hàng",
                path: "/cua-hang",
            },
        ],
    },
    {
        title: "Chính Sách",
        children: [
            {
                title: "Điều khoản dịch vụ",
                path: "/dieu-khoan-dich-vu",
            },

            {
                title: "Chính sách bảo mật",
                path: "/chinh-sach-bao-mat",
            },

            {
                title: "Chính Sách Đổi Trả",
                path: "/chinh-sach-doi-tra",
            },

            {
                title: "Câu Hỏi Thường Gặp",
                path: "/cau-hoi-thuong-gap",
            },
        ],
    },
];

export const Footer = () => {
    return (
        <div className={cx("footer", "mt-5")}>
            <Container>
                <Row>
                    <Col md={3}>
                        <LogoHeader />
                        <div>
                            {address.Icon}
                            <span>{address.title}</span>
                        </div>
                        <div>
                            {phone.Icon}
                            <span>{phone.title}</span>
                        </div>
                        <div>
                            {email.Icon}
                            <span>{email.title}</span>
                        </div>
                    </Col>
                    <Col md={3}>
                        <h4>{navbar[0].title}</h4>
                        <ul className={cx("no-bullet")}>
                            {navbar[0].children.map((child, idx) => (
                                <li key={idx}>
                                    <a href={child.path}>{child.title}</a>
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h4>{navbar[1].title}</h4>
                        <ul className={cx("no-bullet")}>
                            {navbar[1].children.map((child, idx) => (
                                <li key={idx}>
                                    <a href={child.path}>{child.title}</a>
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h4>ĐĂNG KÝ NHẬN TIN</h4>
                        <p>Bạn muốn nhận khuyến mãi đặc biệt? Đăng ký ngay.</p>
                        <form action="#">
                            <div>
                                <input type="text" placeholder="Nhập địa chỉ email" />
                                <button type="submit" className="btn-submit">
                                    Đăng ký
                                </button>
                            </div>
                            <div className={cx("footer-social")}>
                                <div>
                                    <AiFillFacebook />
                                </div>
                                <div>
                                    <SiZalo />
                                </div>
                                <div>
                                    <AiFillInstagram />
                                </div>
                                <div>
                                    <AiFillYoutube />
                                </div>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;
