import classNames from "classnames/bind";
import styles from "~/styles/Pagination.module.scss";

const cx = classNames.bind(styles);

export default function PaginationItem({ children, active, disabled, ...rest }) {
    return (
        <li
            className={cx(
                "item",
                "d-flex align-items-center justify-content-center",
                active ? "active" : "",
                disabled ? "disabled" : ""
            )}
            {...rest}>
            {children}
        </li>
    );
}
