import React from 'react'
import style from './Styles/Task.module.css'
import Profile from '../Login/Profile'
import CountView from '../CountView'

export default function Task() {
    return (
        <div className={style.container}>
            <Profile />
            <CountView path="task" />
        </div>
    )
}