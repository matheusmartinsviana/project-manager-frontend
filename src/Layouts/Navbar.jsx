import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaHome, FaTasks } from "react-icons/fa";
import { FaUserPen, FaFilePen, FaRegShareFromSquare } from "react-icons/fa6";
import style from './Styles/Navbar.module.css';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <nav className={style.navbarContainer}>
            <picture>
                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" height={60} width={60} />
            </picture>
            <div className={style.navbarItems}>
                <ul className={style.item}>
                    <li>
                        <a
                            className={currentPath === '/' ? style.activeLink : ''}
                            onClick={() => navigate('/')}
                        >
                            <div className={style.reactIcon}><FaHome size={20} /></div>
                            <span>Home</span>
                        </a>
                    </li>
                </ul>
                <ul className={style.item}>
                    <li>
                        <a
                            className={currentPath === '/user' ? style.activeLink : ''}
                            onClick={() => navigate('/user')}
                        >
                            <div className={style.reactIcon}><FaUserPen size={20} /></div>
                            <span>Users</span>
                        </a>
                    </li>
                </ul>
                <ul className={style.item}>
                    <li>
                        <a
                            className={currentPath === '/project' ? style.activeLink : ''}
                            onClick={() => navigate('/project')}
                        >
                            <div className={style.reactIcon}><FaFilePen size={20} /></div>
                            <span>Projects</span>
                        </a>
                    </li>
                </ul>
                <ul className={style.item}>
                    <li>
                        <a
                            className={currentPath === '/task' ? style.activeLink : ''}
                            onClick={() => navigate('/task')}
                        >
                            <div className={style.reactIcon}><FaTasks size={20} /></div>
                            <span>Tasks</span>
                        </a>
                    </li>
                </ul>
            </div>
            <footer className={style.navUnderFooter}>
                <a href="https://github.com/matheusmartinsviana" target="_blank" rel="noopener noreferrer">
                    <span>Find out more</span><FaRegShareFromSquare size={16} />
                </a>
            </footer>
        </nav>
    );
}