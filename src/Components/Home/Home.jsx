import React, { useEffect, useState } from 'react';
import style from './Styles/Home.module.css';
import Profile from '../Login/Profile';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            window.location.href = '/login';
        }
    }, []);

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className={style.container}>
            <Profile />
            home
        </div>
    );
};

export default Home;
