import React, { useState } from 'react';
import Profile from '../Login/Profile';
import style from './Styles/User.module.css';
import CountView from '../CountView';
import Button from '../Button';
import Modal from 'react-modal';
import Forms from '../Forms';

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

    return (
        <div className={style.container}>
            <Profile />
            <CountView path="user" />
            <Button children='Add a new user' onClick={() => openModal('add')} />
            <Button children='Update user' onClick={() => openModal('update')} />
            <Button children='Delete user' onClick={() => openModal('delete')} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={style.modal}
            >
                <Forms type='user' action={formAction} />
                <Button onClick={closeModal} />
            </Modal>
        </div>
    );
}