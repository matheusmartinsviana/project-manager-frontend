import React, { useState } from 'react';
import Profile from '../Login/Profile';
import style from './Styles/User.module.css';
import CountView from '../CountView';
import Button from '../Button';
import Modal from 'react-modal';
import Forms from '../Forms';
import NavHome from '../Home/NavHome';
import LoginVerificaion from '../LoginVerification';

Modal.setAppElement('#root');

export default function User() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formAction, setFormAction] = useState('add');
    const [lastAddedItem, setLastAddedItem] = useState(null); // Novo estado

    function openModal(action) {
        setFormAction(action);
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function handleItemAdded(item) {
        setLastAddedItem(item);
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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={style.modal}
            >
                <Forms
                    type='user'
                    action={formAction}
                    onItemAdded={handleItemAdded}
                />
                <Button onClick={closeModal} />
                {lastAddedItem && (
                    <div>
                        <h4>Last Added User:</h4>
                        <pre>{JSON.stringify(lastAddedItem, null, 2)}</pre>
                    </div>
                )}
            </Modal>
        </div>
    );
}