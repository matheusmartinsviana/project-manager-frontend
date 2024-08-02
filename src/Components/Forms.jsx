import React, { useState } from 'react';
import style from './Styles/Forms.module.css';

const FormContent = ({ type, action, onItemAdded }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response;
            switch (action) {
                case 'add':
                    response = await fetch(`http://localhost:8000/api/v1/${type}/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            password: password
                        })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        if (onItemAdded) onItemAdded(data);
                        window.location.reload();
                    } else {
                        console.log('Failed to fetch');
                    }
                    break;

                case 'update':
                    response = await fetch(`http://localhost:8000/api/v1/${type}/${id}`, {
                        method: "PUT",
                        headers: {
                            "authorization": localStorage.getItem('token'),
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            id: id,
                            name: name,
                            email: email,
                            password: password
                        })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        window.location.reload();
                    } else {
                        console.log('Failed to fetch');
                    }
                    break;

                case 'delete':
                    response = await fetch(`http://localhost:8000/api/v1/${type}/${id}/`, {
                        method: "DELETE",
                        headers: {
                            "authorization": localStorage.getItem('token'),
                            "Content-Type": "application/json"
                        }
                    });
                    window.location.reload();
                    break;

                default:
                    console.log('Unsupported action');
            }
        } catch (e) {
            console.log(e);
        }
    };

    if (type !== 'user') {
        return <p>Unsupported type</p>;
    }

    return (
        <form className={style.userForms} onSubmit={handleSubmit}>
            <h3>{action} a {type}</h3>
            {action === 'delete' ? (
                <>
                    <label htmlFor="id">User ID:</label>
                    <input type="text" id="id" name="id" placeholder="Type user ID" value={id} onChange={(e) => setId(e.target.value)} />
                    <button type="submit">Delete</button>
                </>
            ) : (
                <>
                    {action === 'update' && (
                        <>
                            <label htmlFor="id">ID:</label>
                            <input type="text" id="id" name="id" placeholder="Type user ID" value={id} onChange={(e) => setId(e.target.value)} />
                        </>
                    )}
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Type a name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Type an email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Type a new password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit">{action === 'add' ? 'Add User' : 'Update User'}</button>
                </>
            )}
        </form>
    );
};

export default function Forms({ type, action, onItemAdded }) {
    return (
        <div className={style.formContainer}>
            <FormContent type={type} action={action} onItemAdded={onItemAdded} />
        </div>
    );
}