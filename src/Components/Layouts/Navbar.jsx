import React from 'react';
import { FaHome, FaTasks } from "react-icons/fa";
import { FaUserPen, FaFilePen, FaRegShareFromSquare } from "react-icons/fa6";
import logo from '../../assets/logoByFreepik.png';
import style from './Styles/Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={style.navbarContainer}>
            <picture>
                <img src={logo} alt="Project Manager Logo" height={80} width={80}/>
            </picture>
            <div className={style.navbarItems}>
                <ul className={style.item}>
                    <li><a href="#"> <div className={style.reactIcon}><FaHome size={20} /></div>Home</a></li>
                </ul>
                <ul className={style.item}>
                    <li><a href="#"> <div className={style.reactIcon}><FaUserPen size={20} /></div>Users</a></li>
                </ul>
                <ul className={style.item}>
                    <li><a href="#"> <div className={style.reactIcon}><FaFilePen size={20} /></div>Projects</a></li>
                </ul>
                <ul className={style.item}>
                    <li><a href="#"> <div className={style.reactIcon}><FaTasks size={20} /></div>Tasks</a></li>
                </ul>
            </div>
            <footer>
                <a href="https://github.com/matheusmartinsviana/project-manager-frontend" target="_blank" rel="noopener noreferrer">Find out more<FaRegShareFromSquare size={16}/></a>
            </footer>
        </nav>
    )
}