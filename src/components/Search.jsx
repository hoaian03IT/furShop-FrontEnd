import { useContext, useEffect, useId, useState } from "react";
import { Offcanvas, Container, Row, Col, FormGroup } from "react-bootstrap";
import classNames from "classnames/bind";
import { CiSearch } from "react-icons/ci";
import { LogoHeader } from "./Header/LogoHeader";
import { InteractionGroupBtn } from "./Header/InteractionGroupBtn";
import { HeaderContext } from "./Header/Header";
import { useDebounce } from "~/hooks/useDebounce";

import styles from "~/styles/Search.module.scss";
import axios from "axios";
import { ResultSearchModal } from "./ResultSearchModal";

const cx = classNames.bind(styles);

export const Search = () => {
    const { showSearchOffCanvas, setShowSearchOffCanvas } = useContext(HeaderContext);
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchList, setSearchList] = useState([]);

    const debouncedSearchValue = useDebounce(searchValue, 500);

    useEffect(() => {
        const fetchSearchProduct = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/api/san-pham/loc-san-pham?query=${debouncedSearchValue}&pageSize=10   `);
                setSearchList(res.data.products);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchSearchProduct();
    }, [debouncedSearchValue]);

    const inputId = useId();

    const handleClose = () => setShowSearchOffCanvas(false);

    return (
        <div className="position-relative">
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
                        <Col className="justify-content-center position-relative">
                            <FormGroup className={cx("search-group")}>
                                <input
                                    id={inputId}
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                                <label htmlFor={inputId}>
                                    <CiSearch className="fs-2" />
                                </label>
                            </FormGroup>
                            <ResultSearchModal
                                show={searchList.length > 0}
                                onHide={handleClose}
                                listProduct={searchList}
                            />
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
