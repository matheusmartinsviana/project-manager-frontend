import React, { useState } from 'react';
import style from './Styles/User.module.css';
import Button from '../Button';
import Modal from 'react-modal';
import Forms from '../Forms';
import NavHome from '../Home/NavHome';
import LoginVerificaion from '../LoginVerification';
import '../../assets/Styles/Modal.css';
Modal.setAppElement('#root');

export default function User() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formAction, setFormAction] = useState('add');

    function openModal(action) {
        setFormAction(action);
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function handleItemAdded(item) {
        closeModal();
    }

    return (
        <div className='container'>
            <LoginVerificaion />
            <NavHome path='user' />
            <div className={style.buttonsContainer}>
                <Button children='Add a new user' onClick={() => openModal('add')} />
                <Button children='Update user' onClick={() => openModal('update')} />
                <Button children='Delete user' onClick={() => openModal('delete')} />
            </div>
            <div className={style.modalContainer}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className={'modal'}
                >
                    <Forms
                        type='user'
                        action={formAction}
                        onItemAdded={handleItemAdded}
                    />
                    <Button onClick={closeModal} />
                </Modal>
            </div>
        </div>
    );
}