import classNames from "classnames/bind";
import { FaCheck } from "react-icons/fa6";

import styles from "~/styles/Checkbox.module.scss";
import { useState, useId } from "react";

const cx = classNames.bind(styles);

export const Checkbox = ({ label }) => {
  const [checked, setChecked] = useState(false);

  const inputId = useId();
  return (
    <div className={cx("group", "d-flex align-items-center")}>
      <input
        id={inputId}
        type="checkbox"
        className={cx("input", "d-none")}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
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
      <label htmlFor={inputId}>{label}</label>
    </div>
  );
};
