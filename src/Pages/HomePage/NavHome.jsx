import CountView from "../../Components/CountView";
import Profile from "../Login/Profile";
import style from "./Styles/NavHome.module.css";

export default function NavHome({ path }) {
    return (
        <nav className={style.navHome}>
            {path ? <CountView path={path} /> : null}
            <Profile />
        </nav>

    )
}