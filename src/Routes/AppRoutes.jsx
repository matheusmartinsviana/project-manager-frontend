import React from 'react'
import Home from '../Components/Home/Home'
import Body from '../Components/Layouts/Body'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Body />}>
                    <Route path='/' element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}