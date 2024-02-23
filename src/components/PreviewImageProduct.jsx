import { useState } from "react";
import { Row, Col, Image, Carousel } from "react-bootstrap";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import classNames from "classnames/bind";
import styles from "~/styles/PreviewImageProduct.module.scss";

const cx = classNames.bind(styles);

const PrevBtn = ({ onClick }) => {
    return (
        <div className={cx("prev-btn")} onClick={onClick}>
            <IoIosArrowBack className={cx("icon", "fs-2")} />
        </div>
    );
};

const ForWardBtn = ({ onClick }) => {
    return (
        <div className={cx("next-btn")} onClick={onClick}>
            <IoIosArrowForward className={cx("icon", "fs-2")} />
        </div>
    );
};

export const PreviewImageProduct = ({ images }) => {
    const [activePreviewImage, setActivePreviewImage] = useState(0);

    return (
        <Row className={cx("wrapper")}>
            <Col md={2}>
                <div className={cx("img-preview")}>
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={cx("item", activePreviewImage === index ? "active" : "")}
                            onClick={() => setActivePreviewImage(index)}>
                            <Image src={img} className={cx("img", "w-100 h-100")} />
                        </div>
                    ))}
                </div>
            </Col>
            <Col md={10}>
                <Carousel
                    activeIndex={activePreviewImage}
                    className={cx("img-slider", "product-detail")}
                    fade={true}
                    nextIcon={
                        <ForWardBtn
                            onClick={() => setActivePreviewImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                        />
                    }
                    prevIcon={
                        <PrevBtn
                            onClick={() => setActivePreviewImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                        />
                    }>
                    {images.map((img, index) => (
                        <Carousel.Item key={index} className={cx("h-100")}>
                            <Image src={img} alt={index} className={cx("img", "h-100 w-100")} />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Col>
        </Row>
    );
};
