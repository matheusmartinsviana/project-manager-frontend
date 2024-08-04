import React, { useEffect, useState } from 'react';
import Button from '../Button';
import style from './Styles/Home.module.css';
import { useNavigate } from 'react-router-dom';
import NavHome from './NavHome';

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className='container2'>
            <NavHome />
            <div className={style.userPath}>
                <Button onClick={() => navigate('/project-manager-frontend/user')}>Add a new User</Button>
                <Button onClick={() => navigate('/project-manager-frontend/project')}>Add a new Project</Button>
                <Button onClick={() => navigate('/project-manager-frontend/task')}>Add a new Task</Button>
            </div>
        </div>
    );
};

export default Home;
