import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from '../Layouts/Body'
import Home from '../Pages/HomePage/Home.jsx'
import Login from '../Pages/Login/Login.jsx'
import Register from '../Pages/Login/Register.jsx'
import User from '../Pages/User/User.jsx'
import Task from '../Pages/Task/Task.jsx'
import Project from '../Pages/Project/Project.jsx';

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