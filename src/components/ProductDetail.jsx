import { Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import { PreviewImageProduct } from "./PreviewImageProduct";
import { pathname } from "~/configs/path";
import promoteImg from "~/assets/imgs/icon-product-promotion.png";
import { ImFacebook, ImPinterest, ImTwitter } from "react-icons/im";
import { formatCurrencyVND } from "~/utils";
import { useEffect, useState } from "react";
import { QuantityEditor } from "./QuantityEditor";
import { Link, useNavigate } from "react-router-dom";
import { axiosInterceptor } from "~/utils/axiosInterceptor";
import { useSelector, useDispatch } from "react-redux";
import { uploadToCardApi } from "~/api-server";
import { toast } from "react-toastify";

import styles from "~/styles/ProductDetail.module.scss";
import { CiShop } from "react-icons/ci";

const cx = classNames.bind(styles);

export const ProductDetail = ({ product }) => {
  const { user } = useSelector((state) => state.persist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    _id,
    productName,
    brand,
    price = 0,
    discount = 0,
    attributes,
  } = product;

  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [stock, setStock] = useState(0);

  const [selectedAttributes, setSelectedAttributes] = useState({
    _id: "",
    size: "",
    color: "",
    quantity: 0,
    image: "",
  });

  const axiosJWT = axiosInterceptor(user, dispatch, navigate);

  // push images of products to state
  useEffect(() => {
    let imgs = [];
    attributes?.forEach((attr) => {
      if (!imgs.includes(attr.image)) imgs.push(attr.image);
    });
    setImages(imgs);
  }, [attributes]);

  // filter colors of products
  useEffect(() => {
    let colorsAttr = [];
    attributes?.forEach((attr) => {
      if (!colorsAttr.includes(attr.color)) colorsAttr.push(attr.color);
    });
    setColors(colorsAttr);
  }, [attributes]);

  // cap nhat stock, image va _id cua attribute khi da chon size va mau cua san pham
  useEffect(() => {
    const selected = attributes?.filter(
      (attr) =>
        attr.color === selectedAttributes.color &&
        attr.size === selectedAttributes.size
    )[0];
    const stockProduct = selectedAttributes.size ? selected.quantity : 0;
    setStock(stockProduct);
    setSelectedAttributes({
      ...selectedAttributes,
      image: selected?.image,
      _id: selected?._id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes, selectedAttributes.size]);

  const handleSelectColor = (color) => {
    setSelectedAttributes({ ...selectedAttributes, color: color, size: "" });
    let sizes = [];
    attributes.forEach((attr) => {
      if (attr.color === color) sizes.push(attr.size);
    });
    setSizes(sizes);
  };

  const handleSelectSize = (size) => {
    setSelectedAttributes({ ...selectedAttributes, size: size, quantity: 1 });
  };

  const handleIncreaseQuantity = () => {
    if (selectedAttributes.size) {
      if (selectedAttributes.quantity !== stock) {
        setSelectedAttributes({
          ...selectedAttributes,
          quantity: Number(selectedAttributes.quantity) + 1,
        });
      }
    }
  };

  const handleDecreaseQuantity = () => {
    if (selectedAttributes.size) {
      if (selectedAttributes.quantity !== 1) {
        setSelectedAttributes({
          ...selectedAttributes,
          quantity: Number(selectedAttributes.quantity) - 1,
        });
      }
    }
  };

  const handleChangeQuantityByEnter = (e) => {
    const value = e.target.value;
    if (value < 1) {
      setSelectedAttributes({ ...selectedAttributes, quantity: 1 });
    } else if (value > stock) {
      setSelectedAttributes({ ...selectedAttributes, quantity: stock });
    } else {
      setSelectedAttributes({ ...selectedAttributes, quantity: value });
    }
  };

  const handleAddToCart = async () => {
    try {
      if (user.isLogged) {
        await uploadToCardApi(
          {
            amount: selectedAttributes.quantity,
            productId: _id,
            productAttributes: selectedAttributes._id,
          },
          axiosJWT,
          dispatch
        );
        toast.success("Đã thêm sản phẩm vào giỏ hàng");
      } else {
        navigate(
          pathname.login +
            `?redirect=${pathname.productDetail.split(":")[0]}${_id}`
        );
        toast.warn("Bạn cần phải đăng nhập để thêm sản phẩm");
      }
    } catch (error) {}
  };

  return (
    <Row md={{ cols: 2 }} className={cx("details", "g-5")}>
      <Col>
        <PreviewImageProduct images={images} />
        <div
          className={cx(
            "share",
            "d-flex align-items-center justify-content-center mt-4"
          )}
        >
          <span className="me-3">Chia sẻ</span>
          <a
            href="#1"
            target="_blank"
            className={cx("social-network", "facebook")}
          >
            <ImFacebook />
          </a>
          <a
            href="#2"
            target="_blank"
            className={cx("social-network", "pinterest")}
          >
            <ImPinterest />
          </a>
          <a
            href="#3"
            target="_blank"
            className={cx("social-network", "twitter")}
          >
            <ImTwitter />
          </a>
        </div>
        <div className={cx("add-to-favorite")}>
          <button className={cx("btn-add")}>
            <span>Thêm vào yêu thích</span>
          </button>
        </div>
      </Col>
      <Col>
        <div className={cx("content")}>
          <h4>{productName}</h4>
          <div className="d-flex align-items-center w-100 overflow-hidden">
            <div className={cx("branch", "me-5")}>
              <span className={cx("label")}>Thương hiệu:</span>&nbsp;
              <Link
                to={pathname.product + `?branch=${product.branch?._id}`}
                className={cx("branch-name")}
              >
                {brand?.name}
              </Link>
            </div>
            <div className={cx("product-code")}>
              <span className={cx("label")}>Mã sản phẩm:</span>&nbsp;
              <span className={cx("code")}>{_id}</span>
            </div>
          </div>
          <div className={cx("prices", "mt-4")}>
            <div className="d-flex align-items-center">
              <span className={cx("current-price", "me-2")}>
                {formatCurrencyVND(price - price * discount)}
              </span>
              <span className={cx("origin-price", "me-4")}>
                {formatCurrencyVND(price)}
              </span>
              <span className={cx("discount", "text-danger")}>{`-${
                discount * 100
              }%`}</span>
            </div>
            <span className={cx("save-money")}>{`(Tiết kiệm ${formatCurrencyVND(
              price * discount
            )})`}</span>
          </div>
          <div className={cx("promotion", "my-4")}>
            <ul className={cx("list")}>
              <li className={cx("item")}>
                Hỗ trợ 10.000 phí Ship cho đơn hàng từ 200.000đ
              </li>
              <li className={cx("item")}>
                Miễn phí Ship cho đơn hàng từ 300.000đ
              </li>
              <li className={cx("item")}>
                Đổi trả trong 30 ngày nếu sản phẩm lỗi bất kì
              </li>
            </ul>
            <div className={cx("label", "d-flex align-items-center")}>
              <img className="me-1" src={promoteImg} alt="" />
              <span>khuyến mãi - ưu đãi</span>
            </div>
          </div>
          <div className={cx("color")}>
            <span className={cx("label")}>Màu sắc:</span>
            <div className={cx("colors")}>
              {colors.map((color) => (
                <button
                  key={color}
                  className={cx(
                    "color-btn",
                    color === selectedAttributes.color ? "active" : ""
                  )}
                  onClick={() => handleSelectColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          <div className={cx("size", "mt-4")}>
            <span className={cx("label")}>Kích cỡ:</span>
            <div className={cx("sizes")}>
              {selectedAttributes.color ? (
                sizes.map((size) => (
                  <button
                    key={size}
                    className={cx(
                      "size-btn",
                      selectedAttributes.size === size ? "active" : ""
                    )}
                    onClick={() => handleSelectSize(size)}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <span>Vui lòng chọn màu</span>
              )}
            </div>
            <div className={cx("stock", "mt-4")}>
              <span className={cx("label")}>Số lượng:</span>
              <span>{selectedAttributes.size ? stock : 0}</span>
            </div>
          </div>
          <div className={cx("purchase", "mt-5")}>
            <div className="d-flex">
              <div className="me-2">
                <QuantityEditor
                  onIncrease={handleIncreaseQuantity}
                  onDecrease={handleDecreaseQuantity}
                  value={selectedAttributes.quantity}
                  onChange={(e) => handleChangeQuantityByEnter(e)}
                />
              </div>
              <button
                className={cx("add-to-cart", "text-uppercase flex-grow-1")}
                onClick={handleAddToCart}
              >
                thêm vào giỏ hàng
              </button>
            </div>
            <button className={cx("buy-product", "text-uppercase mt-2")}>
              mua ngay
            </button>
            <div className={cx("phone-contact", "text-center")}>
              <span>Gọi đặt mua </span>
              <a href="tel:+1800.0000">1800.0000</a>
              <span> (7:30 - 22:00)</span>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};
