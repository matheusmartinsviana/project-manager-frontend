import React from 'react'
import style from './Styles/Task.module.css'
import CountView from '../CountView'
import Profile from '../Login/Profile'

export default function Task() {
    return (
        <div className='container'>
            <Profile />
            <CountView path="task" />
        </div>
    )
}