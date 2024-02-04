import styles from "~/styles/VoicherComponent.module.scss";
import classNames from "classnames/bind";
import expiredVoicherIcon from "~/assets/imgs/expiredVoicherIcon.png";

const cx = classNames.bind(styles);

function Voicher({ icon, title, description, code, expire, isExpired }) {
  return (
    <div className={cx("voicher", "d-flex")}>
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
      <div className={cx("info-voicher")}>
        <h4>{title}</h4>
        <p className={cx('description')}>{description}</p>
        <div
          className={cx(
            "info-detail",
            "d-flex",
            "justify-content-between",
            "align-items-center"
          )}
        >
          <div className={cx('contain-info')}>
            <p className={cx("code-title")}>
              Mã:
              <span>{code}</span>
            </p>
            <p>HSD: {expire}</p>
          </div>
          {isExpired && <img src={expiredVoicherIcon} />}
        </div>
      </div>
    </div>
  );
}

export default Voicher;
