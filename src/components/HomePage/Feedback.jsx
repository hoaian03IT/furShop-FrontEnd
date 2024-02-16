import classNames from "classnames/bind";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import styles from "~/styles/FeedbackHomepage.module.scss";
import Avatar from "~/assets/imgs/avatar.jpg";
import Stars from "../Stars";
const cx = classNames.bind(styles);
const list = [1, 2, 3, 4];
function Feedback() {
  return (
    <Container>
      <Row>
        <Col>
          <Carousel data-bs-theme="dark" className={cx("carousel")}>
            {list.map((item, index) => (
              <Carousel.Item key={index}>
                <div className={cx("d-flex", "justify-content-center")}>
                  <div className={cx("container")}>
                    <div className={cx("d-flex", "justify-content-center")}>
                      <img src={Avatar} />
                    </div>
                    <h3>Nguyen Thanh An</h3>
                    <p>
                      Tôi rất thích kiểu dáng và màu sắc của sản phẩm. Nó rất
                      phù hợp với thể hình của tôi và tạo cảm giác tự tin khi
                      tập luyện. Tôi đã nhận được nhiều lời khen về trang phục
                      của mình. Tôi rất thích kiểu dáng và màu sắc của sản phẩm.
                      Nó rất phù hợp với thể hình của tôi và tạo cảm giác tự tin
                      khi tập luyện. Tôi đã nhận được nhiều lời khen về trang
                      phục của mình.
                    </p>
                    <div className={cx("d-flex", "justify-content-center")}>
                      <Stars />
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default Feedback;
