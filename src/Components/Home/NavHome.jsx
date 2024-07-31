import CountView from "../CountView";
import Profile from "../Login/Profile";
import style from "./Styles/NavHome.module.css";

export default function NavHome({ path }) {
    return (
        <nav className={style.navHome}>
            <CountView path={path}/>
            <Profile />
        </nav>
    )
}