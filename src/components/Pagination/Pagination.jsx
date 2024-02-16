import classNames from "classnames/bind";

import styles from "~/styles/Pagination.module.scss";

const cx = classNames.bind(styles);

export default function Pagination({ placement, children }) {
    return (
        <div className={cx("wrapper")}>
            <ul className={cx("pagination", "d-flex align-items-center", placement)}>{children}</ul>
        </div>
    );
}
