import classNames from "classnames/bind";
import { pathname } from "~/configs/path";
import { Col, Container, Row } from "react-bootstrap";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { LogoCheckOut } from "~/components/CheckOutPage/LogoCheckOut";
import { SectionCheckOut } from "~/components/CheckOutPage/SectionCheckOut";
import { SidebarOrder } from "~/components/CheckOutPage/SidebarOrder";
import styles from "~/styles/CheckOutPage.module.scss";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, fetchCartItemApi, fetchCartItemApiAll } from "~/api-server";
import { useNavigate } from "react-router-dom";
import { axiosInterceptor } from "~/utils/axiosInterceptor";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function CheckOutPage() {
    const [addressName, setAddressName] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [billingPhone, setbillingPhone] = useState("");
    const { user } = useSelector((state) => state.persist);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosJWT = axiosInterceptor(user, dispatch, navigate);
    const { cartItems } = useSelector((state) => state.persist.cart);
    const [cartItemsAll, setCartItemsAll] = useState(cartItems);
    const product = useMemo(() => {
        return cartItemsAll.reduce(
            (first, item) => [
                ...first,
                {
                    productId: item.productId._id,
                    productAttributeId: item.productAttributes._id,
                    amount: item.amount,
                },
            ],
            []
        );
    }, [JSON.stringify(cartItemsAll)]);
    const handleCheckout = async () => {
        const dataToSend = {
            customerId: user.userInfo._id,
            name: name,
            product: product,
            address: addressDetail + " " + addressName,
            phoneNumber: billingPhone,
            paymentType: "",
        };
        try {
            await createOrder(dataToSend, axiosJWT, dispatch);
            toast.success("Thanh toán thành công");
            navigate(pathname.product);
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (cartItems.length === 0) {
                    await fetchCartItemApi(dispatch, axiosJWT, 1000, 1);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [cartItems.length]);
    return (
        <div>
            <Container>
                <Row>
                    <Col md={7}>
                        <div className={cx("content")}>
                            <LogoCheckOut />
                            <BreadCrumbs
                                hrefs={[
                                    { path: pathname.cart, name: "Giỏ hàng", isCurrent: false },
                                    {
                                        path: pathname.checkout,
                                        name: "Thanh toán",
                                        isCurrent: true,
                                    },
                                ]}
                            />
                            <SectionCheckOut
                                handleCheckout={handleCheckout}
                                addressName={addressName}
                                setAddressName={setAddressName}
                                addressDetail={addressDetail}
                                setAddressDetail={setAddressDetail}
                                email={email}
                                setEmail={setEmail}
                                name={name}
                                setName={setName}
                                billingPhone={billingPhone}
                                setbillingPhone={setbillingPhone}
                                link={"/gio-hang"}
                            />
                        </div>
                    </Col>
                    <Col md={5}>
                        <SidebarOrder />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CheckOutPage;
