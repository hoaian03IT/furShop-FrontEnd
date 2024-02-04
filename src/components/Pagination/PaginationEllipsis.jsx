import classNames from "classnames/bind";
import { IoEllipsisHorizontal } from "react-icons/io5";

import styles from "~/styles/Pagination.module.scss";

const cx = classNames.bind(styles);

export default function PaginationEllipsis({ disabled, ...rest }) {
    return (
        <li
            className={cx("item", "d-flex align-items-center justify-content-center", disabled ? "disabled" : "")}
            {...rest}>
            <IoEllipsisHorizontal />
        </li>
    );
}
