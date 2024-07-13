import React from 'react'
import Home from '../Components/Home/Home'
import Error from '../Components/Error.jsx'
import Body from '../Components/Layouts/Body'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Components/Login/Login.jsx'
import Register from '../Components/Login/Register.jsx'
import User from '../Components/User/User.jsx'
import Task from '../Components/Task/Task.jsx'
import Project from '../Components/Project/Project.jsx'

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