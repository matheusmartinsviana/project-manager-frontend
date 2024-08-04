import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Components/Home/Home';
import Error from '../Components/Error.jsx';
import Body from '../Components/Layouts/Body';
import Login from '../Components/Login/Login.jsx';
import Register from '../Components/Login/Register.jsx';
import User from '../Components/User/User.jsx';
import Task from '../Components/Task/Task.jsx';
import Project from '../Components/Project/Project.jsx';

export default function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/project-manager-frontend' element={<Body />}>
                    <Route path='/project-manager-frontend/' element={<Home />} />
                    <Route path='/project-manager-frontend/user' element={<User />} />
                    <Route path='/project-manager-frontend/project' element={<Project />} />
                    <Route path='/project-manager-frontend/task' element={<Task />} />
                    <Route path='/project-manager-frontend/login' element={<Login />} />
                    <Route path='/project-manager-frontend/register' element={<Register />} />
                    <Route path='*' element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}