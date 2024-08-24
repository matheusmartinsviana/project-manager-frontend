import React, { useState } from 'react'
import Modal from 'react-modal';
import style from './Styles/Task.module.css'
import LoginVerificaion from '../../Components/General/LoginVerification';
import Button from '../../Components/General/Button'
import '../../assets/Styles/Modal.css';
import CountView from '../../Components/General/CountView';
import TaskCardInfo from '../../Components/Entities/Task/TaskCardInfo';
Modal.setAppElement('#root');

export default function Task() {

    return (
        <div className='container'>
            <LoginVerificaion />
            <CountView path="task" />
            <TaskCardInfo />
            <div className={style.buttonsContainer}>
                <Button children='Add a new Project' />
                <Button children='Update project' />
                <Button children='Delete project' />
            </div>
        </div>
    )
}