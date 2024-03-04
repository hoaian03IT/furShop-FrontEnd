import classNames from "classnames/bind";
import { Spinner } from "react-bootstrap";
import { FaSpinner } from "react-icons/fa6";

import styles from "~/styles/loadingComponent.module.scss";

const cx = classNames.bind(styles);

export const Loading = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "sticky",
        top: 0,
        bottom: 0,
        backgroundColor: "rgba(192,192,192,0.1)",
      }}
    >
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          className={cx("spinner")}
          style={{
            fontSize: "50px",
          }}
        >
          <FaSpinner />
        </span>
      </div>
    </div>
  );
};
