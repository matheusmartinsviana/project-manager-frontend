import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const openModal = (content) => {
        setModalContent(content);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalContent(null);
    };

    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalContent }}>
            {children}
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        {modalContent}
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};