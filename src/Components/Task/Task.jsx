import React, { useState } from 'react'
import Modal from 'react-modal';
import style from './Styles/Task.module.css'
import NavHome from '../Home/NavHome'
import LoginVerificaion from '../LoginVerification'
import Button from '../Button'
import Forms from '../Forms';
import '../../assets/Styles/Modal.css';
Modal.setAppElement('#root');

export default function Task() {
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
            <NavHome path='task'/>
            <div className={style.buttonsContainer}>
                <Button children='Add a new Project' onClick={() => openModal('add')} />
                <Button children='Update project' onClick={() => openModal('update')} />
                <Button children='Delete project' onClick={() => openModal('delete')} />
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={'modal'}
            >
                <Forms
                    type='task'
                    action={formAction}
                    onItemAdded={handleItemAdded}
                />
                <Button onClick={closeModal} />
            </Modal>
        </div>
    )
}