import React from 'react';
import style from './Styles/Profile.module.css';
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        navigate('/project-manager-frontend/login');
    };

    return (
        <div className={style.profileContainer}>
            <FaUserCircle className={style.profileIcon} size={30} />
            <div className={style.profileDetails}>
                <button onClick={handleLogout} className={style.logoutButton}>Logout</button>
            </div>
        </div>
    );
}