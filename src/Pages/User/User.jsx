import React, { useState } from 'react';
import style from './Styles/User.module.css';
import Button from '../../Components/General/Button';
import LoginVerificaion from '../../Components/General/LoginVerification';
import '../../assets/Styles/Modal.css';
import UserCardInfo from '../../Components/Entities/User/UserCardInfo';
import CountView from '../../Components/General/CountView';
import FormAddUser from '../../Components/Entities/User/Forms/FormAddUser';
import { useModal } from '../../Context/useModal';

export default function User() {
    const { openModal } = useModal();

    const handleOpenModal = () => {
        openModal(
            <FormAddUser />
        );
    };

    return (
        <div className='container'>
            <CountView path="user" />
            <LoginVerificaion />
            <UserCardInfo/>
            <div className={style.buttonsContainer}>
                <Button children='Add a new user' onClick={handleOpenModal} />
                <Button children='Update user' />
                <Button children='Delete user' />
            </div>
            <div className={style.modalContainer}></div>
        </div>
    );
}
