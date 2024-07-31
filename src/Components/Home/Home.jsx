import React, { useEffect, useState } from 'react';
import Button from '../Button';
import Profile from '../Login/Profile';
import About from './About';
import style from './Styles/Home.module.css';

const Home = () => {

    return (
        <div className='container2'>
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
