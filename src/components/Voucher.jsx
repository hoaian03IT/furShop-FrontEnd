import styles from "~/styles/VoucherComponent.module.scss";
import classNames from "classnames/bind";
import expiredVoucherIcon from "~/assets/imgs/expiredVoucherIcon.png";

const cx = classNames.bind(styles);

function Voucher({ icon, title, description, code, expire, isExpired }) {
  return (
    <div className={cx("Voucher", "d-flex")}>
      <div className={cx("line-color", "d-block", "bg-primary")}></div>
      <div
        className={cx(
          "contain-icon",
          "d-flex",
          "justify-content-center",
          "align-items-center"
        )}
      >
        <img src={icon} />
      </div>
      <div className={cx("info-Voucher")}>
        <h4>{title}</h4>
        <p className={cx("description")}>{description}</p>
        <div
          className={cx(
            "info-detail",
            "d-flex",
            "justify-content-between",
            "align-items-center"
          )}
        >
          <div className={cx("contain-info")}>
            <p className={cx("code-title")}>
              Mã:
              <span>{code}</span>
            </p>
            <p>HSD: {expire}</p>
          </div>
          {isExpired && <img src={expiredVoucherIcon} />}
        </div>
      </div>
    </div>
  );
}

export default Voucher;
