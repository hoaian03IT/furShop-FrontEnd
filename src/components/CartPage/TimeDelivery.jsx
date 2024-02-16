import classNames from "classnames/bind";
import styles from "~/styles/TimeDelivery.module.scss";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

const cx = classNames.bind(styles);

export const TimeDelivery = ({ title }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState("");
  const handleTimeChange = (event) => {
    const time = event.target.value;
    setSelectDate(time);
  };
  return (
    <div className={cx("content")}>
      <p className={cx("title")}>{title}</p>
      <div className={cx("deliver")}>
        <label className={cx("date")}>
          Ngày nhận hàng
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className={cx("datePicker")}
            dateFormat={"dd/MM/yyyy"}
          />
        </label>
        <label className={cx("time")}>
          Thời gian nhận hàng
          <select className={cx("option")} onChange={handleTimeChange}>
            <option value>Chọn thời gian</option>
            <option value="08h00 - 12h00">08h00 - 12h00</option>
            <option value="14h00 - 18h00">14h00 - 18h00</option>
            <option value="19h00 - 21h00">19h00 - 21h00</option>
          </select>
        </label>
      </div>
    </div>
  );
};
