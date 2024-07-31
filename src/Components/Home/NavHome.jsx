import CountView from "../CountView";
import Profile from "../Login/Profile";
import style from "./Styles/NavHome.module.css";

export default function NavHome() {
    return (
        <nav className={style.navHome}>
            <CountView />
            <Profile />
        </nav>
    )
}