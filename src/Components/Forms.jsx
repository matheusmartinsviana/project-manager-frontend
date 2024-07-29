import React from 'react';
import style from './Styles/Forms.module.css';

const FormContent = ({ type, action }) => {
    if (type === 'user') {
        return (
            <form className={style.userForms}>
                <h3>{action} a {type}</h3>
                {action === 'delete' ? (
                    <>
                        <label htmlFor="id">User ID:</label>
                        <input type="text" id="id" name="id" placeholder="Type user ID" />
                        <button type="submit">Delete</button>
                    </>
                ) : (
                    <>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" placeholder="Type a name" />
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Type an email" />
                        {action === 'update' && (
                            <>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" placeholder="Type a new password" />
                            </>
                        )}
                        <button type="submit">{action === 'add' ? 'Add User' : 'Update User'}</button>
                    </>
                )}
            </form>
        );
    }

    if (type === 'project' || type === 'task') {
        return (
            <form>
                <h3>{action === 'add' ? `Add a new ${type}` : `Update ${type}`}</h3>
                {action === 'delete' && (
                    <>
                        <label htmlFor="id">ID:</label>
                        <input type="text" id="id" name="id" placeholder={`Type ${type} ID`} />
                        <button type="submit">Delete</button>
                    </>
                )}
                {action !== 'delete' && (
                    <>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" placeholder={`Type ${type} title`} />
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" placeholder={`Type ${type} description`} />
                        <button type="submit">{action === 'add' ? `Add ${type}` : `Update ${type}`}</button>
                    </>
                )}
            </form>
        );
    }

    return null;
};

export default function Forms({ type, action }) {
    return (
        <div className={style.formContainer}>
            <FormContent type={type} action={action} />
        </div>
    );
}