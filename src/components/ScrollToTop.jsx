import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

import styles from "~/styles/ScrollToTop.module.scss";

const cx = classNames.bind(styles);

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const [active, setActive] = useState(false);

    const scrollFunction = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        scrollFunction();
    }, [pathname]);

    const toggleShowBtn = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 100) {
            setActive(true);
        } else {
            setActive(false);
        }
    };

    window.addEventListener("scroll", toggleShowBtn);

    return (
        <div className={cx("scroll-to-top", active ? "active" : "")}>
            <button className={cx("btn-scroll")} onClick={scrollFunction}>
                <MdOutlineKeyboardDoubleArrowUp className="fs-1" />
            </button>
        </div>
    );
};

export default ScrollToTop;
