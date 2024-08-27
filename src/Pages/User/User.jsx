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
import FormUpdateUser from '../../Components/Entities/User/Forms/FormUpdateUser';

export default function User() {
    const { openModal } = useModal();
    const { users, loading, error, fetchUsers } = useGetUsersData();
    const [usersData, setUsersData] = useState(users);

    useEffect(() => {
        setUsersData(users);
    }, [users]);

    const handleOpenModal = (action) => {
        switch (action) {
            case "add":
                openModal(<FormAddUser onUserAction={fetchUsers} />);
                break;
            case "update":
                openModal(<FormUpdateUser onUserAction={fetchUsers} />);
                break;
            case "delete":
                break;
            default:
                return;
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='container'>
            <CountView path="user" />
            <LoginVerification />
            <UserCardInfo users={usersData} />
            <div className={style.buttonsContainer}>
                <Button children='Add a new user' onClick={() => handleOpenModal("add")} />
                <Button children='Update user' onClick={() => handleOpenModal("update")} />
                <Button children='Delete user' />
            </div>
            <div className={style.modalContainer}></div>
        </div>
    );
}