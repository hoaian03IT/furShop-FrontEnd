import classNames from "classnames/bind";
import styles from "~/styles/PaymentCompany.module.scss";

const cx = classNames.bind(styles);
export const PaymentCompany = () => {
  return (
    <div className={cx("company-bill")}>
      <div className={cx("form-group")}>
        <label>{"Tên công ty"}</label>
        <input
          type={"text"}
          className={cx("name")}
          placeholder={"Tên công ty"}
        ></input>
      </div>
      <div className={cx("form-group-tax")}>
        <label>{"Mã số thuế"}</label>
        <input
          type={"number"}
          className={cx("tax")}
          placeholder={"Mã số thuế"}
        ></input>
      </div>
      <div className={cx("form-group-address")}>
        <label>{"Địa chỉ công ty"}</label>
        <textarea
          type={"text"}
          className={cx("address")}
          placeholder={
            "Nhập địa chỉ công ty (bao gồm Phường/Xã, Quận/Huyện, Tỉnh/Thành phố nếu có)"
          }
        />
      </div>
      <div className={cx("form-group-email")}>
        <label>{"Email nhận hoá đơn"}</label>
        <input
          type={"text"}
          className={cx("email")}
          placeholder={"Email nhận hoá đơn"}
        ></input>
      </div>
    </div>
  );
};
