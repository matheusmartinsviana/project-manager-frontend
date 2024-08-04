import React, { useState } from 'react'
import style from './Styles/Project.module.css'
import NavHome from '../Home/NavHome'
import LoginVerificaion from '../LoginVerification'
import Modal from 'react-modal';
import Button from '../Button';
import Forms from '../Forms';
import '../../assets/Styles/Modal.css';
Modal.setAppElement('#root');

export default function Project() {
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
            <NavHome path='project' />
            <div className={style.buttonsContainer}>
                <Button children='Add a new project' onClick={() => openModal('add')} />
                <Button children='Update project' onClick={() => openModal('update')} />
                <Button children='Delete project' onClick={() => openModal('delete')} />
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={'modal'}
            >
                <Forms
                    type='project'
                    action={formAction}
                    onItemAdded={handleItemAdded}
                />
                <Button onClick={closeModal} />
            </Modal>
        </div>

    )
}