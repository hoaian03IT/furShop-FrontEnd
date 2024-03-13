import classNames from "classnames/bind";
import styles from "../../styles/HomePageComponent.module.scss";
import { backGround } from "./image";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pathname } from "~/configs/path";
const cx = classNames.bind(styles);
function Background() {
    const [imgIndex, setImgInex] = useState(0);
    const navigate = useNavigate();
    const handlePrevious = () => {
        imgIndex === 0 ? setImgInex(backGround.length - 1) : setImgInex(imgIndex - 1);
    };
    const handleNext = () => {
        imgIndex === backGround.length - 1 ? setImgInex(0) : setImgInex(imgIndex + 1);
    };
    return (
        <div className={cx("home")}>
            <div
                style={{ backgroundImage: `url(${backGround[imgIndex]})` }}
                className={cx("background", "d-flex", "align-items-center", "position-relative")}>
                <button className={cx("btn-icon")} onClick={handlePrevious}>
                    <MdOutlineArrowBackIos />
                </button>
                <div className={cx("flex-grow-1", "d-flex", "justify-content-center", "align-items-end", "h-100")}>
                    <div className={cx("contain-info", "position-relative")}>
                        <h3 className={cx("fs-2", "text-center")}>CHUYÊN NGHIỆP</h3>
                        <span className={cx("d-block", "fs-3", "text-center")}>Chất lượng tạo nên thương hiệu</span>
                        <Link to={pathname.product} className={cx("btn-href")}>
                            XEM NGAY
                        </Link>
                    </div>
                </div>
                <button className={cx("btn-icon")} onClick={handleNext}>
                    <MdOutlineArrowForwardIos />
                </button>
            </div>
        </div>
    );
}

export default Background;
