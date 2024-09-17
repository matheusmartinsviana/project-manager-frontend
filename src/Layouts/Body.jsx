import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Profile from '../Pages/Login/Profile'

export default function Body() {

    return (
        <>
            <div style={{display: "flex"}}>
                <Navbar />
                <Profile />
                <Outlet />
            </div>
            <Footer />
        </>
    )
}