import React, { useState } from 'react';
import style from './Styles/Forms.module.css';

const API_URL = 'http://localhost:8000/api/v1';

const FormContent = ({ type, action, onItemAdded }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const requestBody = {
                ...(name && { name }),
                ...(email && { email }),
                ...(password && { password }),
                ...(description && { description }),
                ...(userId && { userId }),
                ...(projectId && { projectId }),
                ...(title && { title }),
            };

            const response = await fetch(`${API_URL}/${type}/${action === 'update' ? id : ''}`, {
                method: action === 'delete' ? 'DELETE' : action === 'update' ? 'PUT' : 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": action === 'update' || action === 'delete' ? localStorage.getItem('token') : undefined,
                },
                body: action !== 'delete' ? JSON.stringify(requestBody) : null,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                if (onItemAdded) onItemAdded(data);
                if (action !== 'delete') window.location.reload();
            } else {
                throw new Error('Failed to fetch');
            }
        } catch (e) {
            setError(e.message);
            console.log(e);
        }
    };

    if (!['user', 'project', 'task'].includes(type)) {
        return <p>Unsupported type</p>;
    }

    return (
        <form className={style.userForms} onSubmit={handleSubmit}>
            <h3>{action} a {type}</h3>
            {error && <p className={style.error}>{error}</p>}
            {action === 'delete' ? (
                <>
                    <label htmlFor="id">ID:</label>
                    <input type="text" id="id" name="id" placeholder="Type ID" value={id} onChange={(e) => setId(e.target.value)} />
                    <button type="submit">Delete</button>
                </>
            ) : (
                <>
                    {action === 'update' && (
                        <>
                            <label htmlFor="id">ID:</label>
                            <input type="text" id="id" name="id" placeholder="Type ID" value={id} onChange={(e) => setId(e.target.value)} />
                        </>
                    )}
                    {type === 'user' && (
                        <>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" placeholder="Type a name" value={name} onChange={(e) => setName(e.target.value)} />
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" placeholder="Type an email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" placeholder="Type a new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </>
                    )}
                    {type === 'project' && (
                        <>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" placeholder="Type a name" value={name} onChange={(e) => setName(e.target.value)} />
                            <label htmlFor="description">Description:</label>
                            <input type="text" id="description" name="description" placeholder="Type a description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <label htmlFor="userId">User ID:</label>
                            <input type="text" id="userId" name="userId" placeholder="Type user ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
                        </>
                    )}
                    {type === 'task' && (
                        <>
                            <label htmlFor="title">Title:</label>
                            <input type="text" id="title" name="title" placeholder="Type a title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <label htmlFor="description">Description:</label>
                            <input type="text" id="description" name="description" placeholder="Type a description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <label htmlFor="projectId">Project ID:</label>
                            <input type="text" id="projectId" name="projectId" placeholder="Type project ID" value={projectId} onChange={(e) => setProjectId(e.target.value)} />
                        </>
                    )}
                    <button type="submit">{action === 'add' ? `Add ${type.charAt(0).toUpperCase() + type.slice(1)}` : `Update ${type.charAt(0).toUpperCase() + type.slice(1)}`}</button>
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