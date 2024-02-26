import { pathname } from "~/configs/path";
import styles from "~/styles/CartPage.module.scss";
import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { ItemProduct } from "~/components/CartPage/ItemProduct";
import { NoteProduct } from "~/components/CartPage/NoteProduct";
import { TotalBill } from "~/components/CartPage/TotalBill";
import { CouponBill } from "~/components/CartPage/CouponBill";
import { CheckOutBill } from "~/components/CartPage/CheckOutBill";
import { Trustbadge } from "~/components/CartPage/Trustbadge";
import { useEffect, useMemo, useState } from "react";
import { axiosInterceptor } from "~/utils/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCartItemApi } from "~/api-server";
import { Loading } from "~/components/Loading";
const cx = classNames.bind(styles);

export default function CartPage() {
    const [quantity, setQuantity] = useState(1);
    const [textValue, setTextValue] = useState("");
    const [checked, setChecked] = useState(false);
    const { user } = useSelector((state) => state.persist);
    const { cartItems, loading } = useSelector((state) => state.persist.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosJWT = axiosInterceptor(user, dispatch, navigate);

    useEffect(() => {
        (async () => {
            await fetchCartItemApi(dispatch, axiosJWT);
        })();
    }, [dispatch]);

    const totalPrice = useMemo(() => {
        return cartItems?.reduce((first, item, i) => {
            const product = item.productId;
            const att = item.productAttributes;
            return product.price * item.amount * (1 - product.discount) + first;
        }, 0);
    });

    return (
        <div>
            <BreadCrumbs
                hrefs={[
                    { path: pathname.home, name: "Trang chủ", isCurrent: false },
                    {
                        path: pathname.cart,
                        name: "Giỏ hàng",
                        isCurrent: true,
                    },
                ]}
            />
            <Container>
                <div className={cx("cart-container")}>
                    <h1 className={cx("cart-title")}>Giỏ hàng</h1>
                    <div className={cx("cart-content")}>
                        <Row>
                            <Col md={8}>
                                <div className={cx("cart-content-product")}>
                                    {loading ? (
                                        <Loading />
                                    ) : (
                                        cartItems?.map((item) => {
                                            console.log(item);
                                            const product = item.productId;
                                            const attributes = item.productAttributes;
                                            return (
                                                <ItemProduct
                                                    key={item._id}
                                                    link={pathname.productDetail.split(":")[0] + product._id}
                                                    img={attributes.image}
                                                    nameProduct={product.productName}
                                                    description={product.description}
                                                    price={product.price}
                                                    discount={product.discount}
                                                    quantity={item.amount}
                                                    setQuantity={setQuantity}
                                                />
                                            );
                                        })
                                    )}
                                    <div className={cx("cart-note")}>
                                        <NoteProduct
                                            label={"Ghi chú hóa đơn"}
                                            textValue={textValue}
                                            setTextValue={setTextValue}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className={cx("cart-checkout")}>
                                    <TotalBill name={"TỔNG CỘNG"} total={totalPrice} />
                                    <CouponBill />
                                    <CheckOutBill disabled={cartItems?.length === 0} />
                                    <Trustbadge />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </div>
    );
}
