import { useContext, useRef, useState } from "react";
import { Offcanvas, Container, Row, Col, FormGroup } from "react-bootstrap";
import classNames from "classnames/bind";
import { CiSearch } from "react-icons/ci";
import { LogoHeader } from "./Header/LogoHeader";
import { InteractionGroupBtn } from "./Header/InteractionGroupBtn";
import { HeaderContext } from "./Header/Header";
import { useDebounce } from "~/hooks/useDebounce";

import styles from "~/styles/Search.module.scss";

const cx = classNames.bind(styles);

export const Search = ({ show, setShow }) => {
    const { showSearchOffCanvas, setShowSearchOffCanvas } = useContext(HeaderContext);
    const [searchValue, setSearchValue] = useState("");

    const debouncedSearchValue = useDebounce(searchValue, 500);

    const inputRef = useRef(null);

    const handleClose = () => setShowSearchOffCanvas(false);

    return (
        <div>
            <Offcanvas
                className={cx("offcanvas-top")}
                placement="top"
                show={showSearchOffCanvas}
                backdropClassName={cx("backdrop")}
                onHide={handleClose}>
                <Container className="py-5">
                    <Row className="align-items-center">
                        <Col md={3}>
                            <LogoHeader />
                        </Col>
                        <Col className="justify-content-center">
                            <FormGroup className={cx("search-group")}>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                                <label htmlFor={inputRef}>
                                    <CiSearch className="fs-2" />
                                </label>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <InteractionGroupBtn />
                        </Col>
                    </Row>
                </Container>
            </Offcanvas>
        </div>
    );
};
