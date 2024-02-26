import classNames from "classnames/bind";
import styles from "~/styles/StarsComponet.module.scss";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);

const starIcons = {
    active: <FaStar />,
    normal: <CiStar />,
};

function Stars({ quality = 5, space = 2, active = 2 }) {
    const [listStars, setListStars] = useState([]);
    const activeStars = Math.round(active);
    useEffect(() => {
        const array = [];
        for (let i = 0; i < quality; i++) {
            array.push(starIcons);
        }
        setListStars(array);
    }, [quality]);
    return (
        <div className={cx("d-flex")}>
            {listStars.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={cx("position-relative")}
                        style={{ margin: space + "px", height: 24 + "px" }}>
                        <span
                            className={cx("text-warning", {
                                "d-none": index > activeStars - 1,
                            })}>
                            {item.active}
                        </span>
                        <span
                            className={cx("text-warning", {
                                "d-none": index <= activeStars - 1,
                            })}>
                            {item.normal}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

export default Stars;
