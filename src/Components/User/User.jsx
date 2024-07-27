import React from 'react'
import Profile from '../Login/Profile'
import style from './Styles/User.module.css'
import CountView from '../CountView'

export default function User() {

    return (
        <div className={style.container}>
            <Profile />
            <CountView path="user" />
        </div>
    )
}