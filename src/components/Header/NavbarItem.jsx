import classNames from "classnames/bind";
import { Link, NavLink } from "react-router-dom";
import { Popper } from "../Popper";
import styles from "~/styles/NavbarItem.module.scss";

const cx = classNames.bind(styles);
export const NavbarItem = ({ path, title, list, fullScreenPopper = false }) => {
    return (
        <div className={`${cx("navbar-item")} ${!fullScreenPopper ? "position-relative" : ""}`}>
            <NavLink
                to={path}
                className={({ isActive }) => (isActive ? cx("navbar-link", "active") : cx("navbar-link"))}>
                <h6 className={cx("title")}>{title}</h6>
            </NavLink>
            {list && (
                <Popper
                    hasArrow={false}
                    position={fullScreenPopper ? "middle" : "left"}
                    fullScreen={fullScreenPopper}
                    className={cx("popper")}>
                    {list?.map((child, index) => (
                        <div key={index} className="px-5 mt-1">
                            <h6 className="text-uppercase text-nowrap">{child.title}</h6>
                            <ul className="list-unstyled m-0">
                                {child.list.map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.path} className={cx("item-link")}>
                                            {item.title[0].toLocaleUpperCase() + item.title.slice(1)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </Popper>
            )}
        </div>
    );
};
