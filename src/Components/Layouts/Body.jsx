import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

export default function Body() {

    return (
        <>
            <div style={{display: "flex"}}>
                <Navbar />
                <Outlet />
            </div>
            <Footer />
        </>
    )
}