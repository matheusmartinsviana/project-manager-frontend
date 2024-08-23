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
                <Route path='/' element={<Body />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/user' element={<User />} />
                    <Route path='/project' element={<Project />} />
                    <Route path='/task' element={<Task />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='*' element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}