import classNames from "classnames/bind";
import styles from "~/styles/AdvertisementBanner.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

export const AdvertisementBanner = ({ img, link }) => {
    return (
        <div className={cx("wrapper")}>
            <Link to={link} className={cx("img-wrapper")}>
                <img src={img} alt="Ảnh banner" srcSet={img} />
            </Link>
        </div>
    );
};
