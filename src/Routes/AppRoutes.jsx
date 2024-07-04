import React from 'react'
import Home from '../Components/Home/Home'
import Error from '../Components/Error.jsx'
import Body from '../Components/Layouts/Body'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Body />}>
                    <Route path='/' element={<Home />} />
                    <Route path='*' element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}