import React from 'react'
import style from './Styles/Task.module.css'
import NavHome from '../Home/NavHome'
import LoginVerificaion from '../LoginVerification'

export default function Task() {
    return (
        <div className='container'>
            <LoginVerificaion />
            <NavHome path='task'/>
        </div>
    )
}