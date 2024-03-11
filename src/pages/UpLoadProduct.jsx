import classNames from "classnames/bind";
import { Fragment, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "~/styles/uploadProductPage.module.scss";
import { axiosInterceptor } from "~/utils/axiosInterceptor";

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

  const handleChooseFile = (e, index) => {
    const file = e.target.files[0];
    console.log(index);
    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      const binaryStr = reader.result;
      setFile((state) => {
        const newState = [...state];
        newState.splice(index, 1, binaryStr);
        return newState;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteFile = (index) => {
    setFile((state) => {
      const newFile = [...state];
      newFile.splice(index, 1, "");
      return newFile;
    });
  };
  console.log(size, quantity, color, file);
  const handleSubmit = async () => {
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
  };
  useEffect(() => {}, []);

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
            />
            <select onChange={(e) => setBrandId(e.target.value)}>
              <option>Chọn thương hiệu</option>
              {brands.map((item, index) => (
                <option value={item._id} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
            <select onChange={(e) => setCategoryId(e.target.value)}>
              <option>Chọn danh mục</option>
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
          />
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập mô tả sản phẩm"
            className="ms-3 me-3"
          ></textarea>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            className={cx("color")}
            placeholder="Nhập discount"
            type="number"
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
                  className={cx("color")}
                  placeholder="Nhập màu"
                />

                <input
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
                    {file[index] && (
                      <img className="border" src={file[index]} />
                    )}
                    <span onClick={(e) => handleDeleteFile(index)}>Xóa</span>
                  </div>
                </div>
                <label
                  className={cx("btn-img")}
                  htmlFor={cx("ip-file-" + index)}
                >
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
            className="bg-dark border-dark me-3"
          >
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
