import classNames from "classnames/bind";
import { pathname } from "~/configs/path";
import { Container } from "react-bootstrap";
import styles from "~/styles/PolicyPage.module.scss";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { PolicyContainer } from "~/components/PolicyPage/PolicyContainer";

const cx = classNames.bind(styles);

function PolicyPage() {
  return (
    <div>
      <BreadCrumbs
        hrefs={[
          { path: pathname.home, name: "Trang chủ", isCurrent: false },
          {
            path: pathname.policy,
            name: "Chính sách đổi trả",
            isCurrent: true,
          },
        ]}
      />
      <Container>
        <div className={cx("container")}>
          <h1 className={cx("title")}>Chính sách đổi trả</h1>
          <PolicyContainer />
        </div>
      </Container>
    </div>
  );
}

export default PolicyPage;
