import React from 'react'
import style from './Styles/Navbar.module.css'
import { FaFolder, FaUser, FaTasks, FaHome } from "react-icons/fa";

export default function Navbar() {
    return (
        <div className={style.navbarContainer}>
            <picture>
                <img src="#" alt="Project Manager Logo" />
            </picture>
            <div className={style.navbarItems}>
                <ul className={style.item}>
                    <li><a href="#"> <div className={style.reactIcon}><FaHome size={20} /></div>Users Operations</a></li>
                </ul>
                <ul className={style.item}>
                    <li><a href="#"> <div className={style.reactIcon}><FaUser size={20} /></div>Users Operations</a></li>
                </ul>
                <ul className={style.item}>
                    <li><a href="#"> <div className={style.reactIcon}><FaFolder size={20} /></div>Projects Operations</a></li>
                </ul>
                <ul className={style.item}>
                    <li><a href="#"> <div className={style.reactIcon}><FaTasks size={20} /></div>Tasks Operations</a></li>
                </ul>
            </div>
        </div>
    )
}