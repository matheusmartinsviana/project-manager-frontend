import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import Profile from '../Login/Profile';
import About from './About';
import style from './Styles/Home.module.css';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            window.location.href = '/project-manager-frontend/login';
        }
    }, []);

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className={style.container}>
            <Profile />
            <About />
            <div className={style.userPath}>
                <Button onClick={() => navigate('/project-manager-frontend/user')}>Add a new User</Button>
                <Button onClick={() => navigate('/project-manager-frontend/project')}>Add a new Project</Button>
                <Button onClick={() => navigate('/project-manager-frontend/task')}>Add a new Task</Button>
            </div>
        </div>
    );
};

export default Home;
