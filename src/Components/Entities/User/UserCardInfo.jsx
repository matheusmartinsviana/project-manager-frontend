import React from 'react';
import CardInfo from "../../General/CardInfo";
import style from "./Style/UserCardInfo.module.css";

const UserCardInfo = ({ users }) => {
    if (!users || users.length === 0) return <p>No users are created</p>;

    return (
        <div className={style.userCardInfo}>
            {users.map((user) => (
                <CardInfo key={user.id}>
                    <p>Id: {user.id}</p>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </CardInfo>
            ))}
        </div>
    );
};

export default UserCardInfo;