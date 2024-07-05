import React from 'react'
import Home from '../Components/Home/Home'
import Error from '../Components/Error.jsx'
import Body from '../Components/Layouts/Body'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import User from '../Components/User/User.jsx'
import Login from '../Components/Login/Login.jsx'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Body />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/user' element={<User />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='*' element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}