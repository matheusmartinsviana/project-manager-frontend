import React from 'react';
import { FaHome, FaTasks } from "react-icons/fa";
import { FaUserPen, FaFilePen, FaRegShareFromSquare } from "react-icons/fa6";
import logo from '../../assets/logoByFreepik.png';
import style from './Styles/Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={style.navbarContainer}>
            <picture>
                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" height={60} width={60} />
            </picture>
            <div className={style.navbarItems}>
                <ul className={style.item}>
                    <li><a href="/project-manager-frontend/"> <div className={style.reactIcon}><FaHome size={20} /></div>Home</a></li>
                </ul>
                <ul className={style.item}>
                    <li><a href="/project-manager-frontend/user"> <div className={style.reactIcon}><FaUserPen size={20} /></div>Users</a></li>
                </ul>
                <ul className={style.item}>
                    <li><a href="/project-manager-frontend/project"> <div className={style.reactIcon}><FaFilePen size={20} /></div>Projects</a></li>
                </ul>
                <ul className={style.item}>
                    <li><a href="/project-manager-frontend/task"> <div className={style.reactIcon}><FaTasks size={20} /></div>Tasks</a></li>
                </ul>
            </div>
            <footer>
                <a href="https://github.com/matheusmartinsviana/project-manager-frontend" target="_blank" rel="noopener noreferrer">Find out more<FaRegShareFromSquare size={16} /></a>
            </footer>
        </nav>
    )
}