import { Link, useLocation } from "react-router-dom";
import styles from "./HeaderLink.module.css";

export default function HeaderLink({children, to}){
    const location = useLocation();
    return (
        <Link className={`
                ${styles.link}
                ${location.pathname === to ? styles.linkDestacado : ""}
            `} to={to}>
            {children}
        </Link>
    )
}