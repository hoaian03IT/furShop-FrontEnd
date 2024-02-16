import classNames from "classnames/bind";
import styles from "~/styles/CheckBoxBill.module.scss";

import { useId } from "react";
const cx = classNames.bind(styles);

export const CheckBoxBill = ({ label, checked, onChange }) => {
  const inputId = useId();

  return (
    <div className={cx("checkBox")}>
      <input
        id={inputId}
        type="checkbox"
        className={cx("regular-checkbox", "d-none")}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={inputId} className={cx("box")}></label>
      <label htmlFor={inputId} className={cx("title")}>
        {label}
      </label>
    </div>
  );
};
