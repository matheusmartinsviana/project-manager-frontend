import React from 'react'
import style from './Styles/Project.module.css'
import NavHome from '../Home/NavHome'
import LoginVerificaion from '../LoginVerification'

export default function Project() {
    return (
        <div className='container'>
            <LoginVerificaion />
            <NavHome path='project'/>
        </div>
    )
}