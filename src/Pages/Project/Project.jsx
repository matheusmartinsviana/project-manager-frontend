import React, { useState } from 'react'
import style from './Styles/Project.module.css'
import LoginVerificaion from '../../Components/General/LoginVerification';
import Modal from 'react-modal';
import Button from '../../Components/General/Button'
import '../../assets/Styles/Modal.css';
import ProjectCardInfo from '../../Components/Entities/Project/ProjectCardInfo';
import CountView from '../../Components/General/CountView';
Modal.setAppElement('#root');

export default function Project() {
  
    return (
        <div className='container'>
            <LoginVerificaion />
            <CountView path="project" />
            <ProjectCardInfo />
            <div className={style.buttonsContainer}>
                <Button children='Add a new project' />
                <Button children='Update project' />
                <Button children='Delete project' />
            </div>
        </div>

    )
}