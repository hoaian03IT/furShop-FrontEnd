import classNames from "classnames/bind";
import { Fragment, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "~/styles/uploadProductPage.module.scss";
import { axiosInterceptor } from "~/utils/axiosInterceptor";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function UploadProduct() {
    const { user } = useSelector((state) => state.persist);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosJWT = axiosInterceptor(user, dispatch, navigate);
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [brandId, setBrandId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [color, setColor] = useState([""]);
    const [size, setSize] = useState([""]);
    const [discount, setDiscount] = useState(0);
    const [quantity, setQuantity] = useState([""]);
    const [att, setAtt] = useState([0]);
    const {
        brand: { brands },
        category: { categories },
    } = useSelector((state) => state.persist);

    const [file, setFile] = useState([""]);

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

    const handleChooseFile = async (e, index) => {
        const file = e.target.files[0];

        const image = await resizeFile(file);
        setFile((state) => {
            const newState = [...state];
            newState.splice(index, 1, image);
            return newState;
        });
    };

    const handleDeleteFile = (index) => {
        setFile((state) => {
            const newFile = [...state];
            newFile.splice(index, 1, "");
            return newFile;
        });
    };
    const handleSubmit = async () => {
        try {
            const att = size.map((item, i) => ({
                size: item,
                color: color[i],
                quantity: quantity[i],
                image: file[i],
            }));
            const reponse = await axiosJWT.post("/api/san-pham/tao-moi", {
                productName,
                price,
                categoryId,
                brandId,
                description,
                discount,
                quantity,
                attributes: att,
            });
            toast.success(reponse.data.message);
            setAtt([0]);
            setProductName("");
            setColor([""]);
            setSize([""]);
            setQuantity([0]);
            setDiscount("");
            setBrandId("0");
            setFile([""]);
            setDescription("");
            setPrice(0);
            setCategoryId("0");
        } catch (error) {
            toast.error(error.response?.data.message || error.message);
        }
    };

    return (
        <Container className={cx("container")}>
            <h1 className="text-center">Cập nhật sản phẩm</h1>
            <Row className={"m-5"}>
                <Col>
                    <div className="d-flex justify-content-center gap-4">
                        <input
                            onChange={(e) => setProductName(e.target.value)}
                            className={cx("name")}
                            placeholder="Nhập tên sản phẩm"
                            value={productName}
                        />
                        <select onChange={(e) => setBrandId(e.target.value)} value={brandId}>
                            <option value="0">Chọn thương hiệu</option>
                            {brands.map((item, index) => (
                                <option value={item._id} key={index}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <select onChange={(e) => setCategoryId(e.target.value)} value={categoryId}>
                            <option value="0">Chọn danh mục</option>
                            {categories.map((item, index) => (
                                <option value={item._id} key={index}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className={"d-flex justify-content-center m-5 align-items-center"}>
                    <input
                        onChange={(e) => setPrice(e.target.value * 1)}
                        className={cx("price")}
                        placeholder="Nhập giá"
                        type="number"
                        value={price}
                    />
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Nhập mô tả sản phẩm"
                        value={description}
                        className="ms-3 me-3"></textarea>
                    <input
                        onChange={(e) => setDiscount(e.target.value)}
                        className={cx("color")}
                        placeholder="Nhập discount"
                        type="number"
                        value={discount}
                    />
                </Col>
            </Row>
            {att.map((item, index) => (
                <div className="mb-5" key={index}>
                    <Row>
                        <Col>
                            <div className="d-flex justify-content-center gap-4">
                                <input
                                    onChange={(e) =>
                                        setSize((state) => {
                                            const newSize = [...state];
                                            newSize.splice(index, 1, e.target.value);
                                            return newSize;
                                        })
                                    }
                                    value={size[index]}
                                    className={cx("size")}
                                    placeholder="Nhập size"
                                />
                                <input
                                    onChange={(e) =>
                                        setColor((state) => {
                                            const newState = [...state];
                                            newState.splice(index, 1, e.target.value);
                                            return newState;
                                        })
                                    }
                                    value={color[index]}
                                    className={cx("color")}
                                    placeholder="Nhập màu"
                                />

                                <input
                                    value={quantity[index]}
                                    onChange={(e) =>
                                        setQuantity((state) => {
                                            const newState = [...state];
                                            newState.splice(index, 1, e.target.value * 1);
                                            return newState;
                                        })
                                    }
                                    className={cx("color")}
                                    placeholder="Số lượng"
                                    type="number"
                                />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col className={"d-flex justify-content-center"}>
                            <div>
                                <input
                                    onChange={(e) => handleChooseFile(e, index)}
                                    type="file"
                                    title="Chọn ảnh"
                                    // multiple
                                    accept=".png, .jpg"
                                    className="d-none"
                                    id={cx("ip-file-" + index)}
                                />
                                <div className={cx("imgs")}>
                                    <div className={cx("img-hover")}>
                                        {file[index] && <img className="border" src={file[index]} />}
                                        <span onClick={(e) => handleDeleteFile(index)}>Xóa</span>
                                    </div>
                                </div>
                                <label className={cx("btn-img")} htmlFor={cx("ip-file-" + index)}>
                                    <span>Chọn ảnh</span>
                                </label>
                            </div>
                        </Col>
                    </Row>
                </div>
            ))}
            <Row>
                <Col className="d-flex justify-content-center">
                    <Button
                        onClick={() => {
                            setAtt([...att, att.length + 1]);
                            setSize([...size, ""]);
                            setQuantity([...quantity, 0]);
                            setColor([...color, ""]);
                            setFile([...file, ""]);
                        }}
                        className="bg-dark border-dark me-3">
                        Thêm
                    </Button>
                    <Button className="bg-dark border-dark ms-3" onClick={handleSubmit}>
                        Tạo
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default UploadProduct;
