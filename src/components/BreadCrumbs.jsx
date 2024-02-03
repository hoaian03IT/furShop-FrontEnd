import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "~/styles/BreadCrumbs.module.scss";

const cx = classNames.bind(styles);

// hrefs là mảng, mỗi phần tử là {path: string, name: string, isCurrent: boolean}
export const BreadCrumbs = ({ hrefs = [] }) => {
  console.log(hrefs);
  return (
    <div className={cx("wrapper", "mb-3 d-flex align-items-center")}>
      <Container>
        <div className={cx("breadcrumb")}>
          {hrefs.map((item) => (
            <Link
              to={item.path}
              className={cx("breadcrumb-item", item.isCurrent ? "active" : "")}
              key={item.path}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};
