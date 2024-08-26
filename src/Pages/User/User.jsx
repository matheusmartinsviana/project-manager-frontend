import React, { useEffect, useState } from 'react';
import style from './Styles/User.module.css';
import Button from '../../Components/General/Button';
import LoginVerification from '../../Components/General/LoginVerification';
import '../../assets/Styles/Modal.css';
import UserCardInfo from '../../Components/Entities/User/UserCardInfo';
import CountView from '../../Components/General/CountView';
import FormAddUser from '../../Components/Entities/User/Forms/FormAddUser';
import { useModal } from '../../Context/useModal';
import useGetUsersData from "../../Hooks/User/Get/useGetUsersData";

export default function User() {
    const { openModal } = useModal();
    const { users, loading, error, fetchUsers } = useGetUsersData();
    const [usersData, setUsersData] = useState(users);

    useEffect(() => {
        setUsersData(users);
    }, [users]);

    const handleOpenModal = () => {
        openModal(
            <FormAddUser onUserAdded={fetchUsers} />
        );
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='container'>
            <CountView path="user" />
            <LoginVerification />
            <UserCardInfo users={usersData} />
            <div className={style.buttonsContainer}>
                <Button children='Add a new user' onClick={handleOpenModal} />
                <Button children='Update user' />
                <Button children='Delete user' />
            </div>
            <div className={style.modalContainer}></div>
        </div>
    );
}