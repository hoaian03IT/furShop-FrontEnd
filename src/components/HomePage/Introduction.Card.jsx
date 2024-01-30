import styles from "../../styles/IntroductionCardHomePageComponent.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Cards({
  Icon,
  title,
  description,
  className,
  background = "transparent",
  border,
  borderIcon,
  cursor,
  hover,
}) {
  return (
    <div
      style={{ backgroundColor: background }}
      className={cx("card", {
        border: border,
        "border-primary": border,
        cursor,
      })}
    >
      <div className={cx("p-3", { hover })}>
        <span
          className={cx("fs-3", "icon", {
            [className]: className,
            border: borderIcon,
            "border-primary": borderIcon,
          })}
        >
          {Icon}
        </span>
        <h5 className={cx("text-center", "title")}>{title}</h5>
        <p className={cx("text-center", "m-0", "description")}>{description}</p>
      </div>
    </div>
  );
}

export default Cards;
