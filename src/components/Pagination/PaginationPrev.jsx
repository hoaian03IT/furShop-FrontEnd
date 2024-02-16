import classNames from "classnames/bind";
import { IoIosArrowBack } from "react-icons/io";

import styles from "~/styles/Pagination.module.scss";

const cx = classNames.bind(styles);

export default function PaginationPrev({ disabled, ...rest }) {
    return (
        <li
            className={cx("item", "d-flex align-items-center justify-content-center", disabled ? "disabled" : "")}
            {...rest}>
            <IoIosArrowBack />
        </li>
    );
}
