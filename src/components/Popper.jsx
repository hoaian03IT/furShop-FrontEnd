import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "~/styles/Popper.module.scss";

const cx = classNames.bind(styles);

export const Popper = ({ children, className, position = "left", hasArrow = false, fullScreen = false }) => {
    const [positionOfThis, setPositionOfThis] = useState(null);

    useEffect(() => {
        if (position === "left") setPositionOfThis("left");
        else if (position === "right") setPositionOfThis("right");
        else if (position === "middle") setPositionOfThis("middle");
        else setPositionOfThis(undefined);
    }, [position]);

    return (
        <div
            className={cx(
                "popper",
                className,
                positionOfThis ? positionOfThis : "",
                hasArrow ? "arrow" : "",
                fullScreen ? "full-screen" : ""
            )}>
            {children}
        </div>
    );
};
