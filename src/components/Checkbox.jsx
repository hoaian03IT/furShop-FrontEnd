import classNames from "classnames/bind";
import { FaCheck } from "react-icons/fa6";

import styles from "~/styles/Checkbox.module.scss";
import { useId } from "react";

const cx = classNames.bind(styles);

export const Checkbox = ({ label, checked, onChange }) => {
  const inputId = useId();
  return (
    <div className={cx("group", "d-flex align-items-center")}>
      <input
        id={inputId}
        type="checkbox"
        className={cx("input", "d-none")}
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={inputId}
        className={cx(
          "checkbox",
          "d-flex align-items-center justify-content-center me-2"
        )}
      >
        <FaCheck className="text-white" />
      </label>
      <label htmlFor={inputId} className={cx("text")}>
        {label}
      </label>
    </div>
  );
};
