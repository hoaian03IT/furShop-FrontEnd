import classNames from "classnames/bind";
import styles from "~/styles/TotalBill.module.scss";
import { formatCurrencyVND } from "~/utils";

const cx = classNames.bind(styles);
export const TotalBill = ({ name, total }) => {
    const realTotal = total * 1;
    return (
        <div className={cx("title")}>
            <div className={cx("totalBill")}>
                <h4 className={cx("name")}>{name}</h4>
                <span className={cx("total")}>{formatCurrencyVND(realTotal)}</span>
            </div>
            <i className={cx("vat")}>(Đã bao gồm VAT nếu có)</i>
        </div>
    );
};
