import React from 'react'
import style from './Styles/Project.module.css'
import Profile from '../Login/Profile'
import CountView from '../CountView'

export default function Project() {
    return (
        <div className='container'>
            <Profile />
            <CountView path="project" />
        </div>
    )
}