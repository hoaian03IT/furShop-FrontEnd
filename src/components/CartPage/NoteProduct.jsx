import classNames from "classnames/bind";
import styles from "~/styles/NoteProduct.module.scss";
import { useId } from "react";
const cx = classNames.bind(styles);

export const NoteProduct = ({ label, textValue, setTextValue }) => {
  const inputId = useId();
  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };
  return (
    <>
      <label htmlFor={inputId} className={cx("text")}>
        {label}
      </label>
      <textarea
        className={cx("textBox")}
        id={inputId}
        value={textValue}
        onChange={handleTextChange}
      />
    </>
  );
};
