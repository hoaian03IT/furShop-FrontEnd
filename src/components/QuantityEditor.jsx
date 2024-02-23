import classNames from "classnames/bind";
import styles from "~/styles/QuantityEditor.module.scss";
import { IoIosAdd, IoIosRemove } from "react-icons/io";

const cx = classNames.bind(styles);

export const QuantityEditor = ({ onIncrease, onDecrease, value, onChange }) => {
    return (
        <div className={cx("wrapper", "d-flex align-items-center justify-content-between")}>
            <button className={cx("btn", "btn-decrease")} onClick={onDecrease}>
                <IoIosRemove className="fs-4" />
            </button>
            <input className={cx("quantity")} type="number" value={value} onChange={onChange} max={99} min={1} />
            <button className={cx("btn", "btn-increase")} onClick={onIncrease}>
                <IoIosAdd className="fs-4" />
            </button>
        </div>
    );
};
