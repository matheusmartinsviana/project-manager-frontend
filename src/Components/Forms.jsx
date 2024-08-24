import React, { useState } from 'react';
import style from './Styles/Forms.module.css';

const API_URL = 'https://project-manager-74i7.onrender.com/api/v1';

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

            const response = await fetch(`${API_URL}/${type}/${action === 'update' || action === 'delete' ? id : ''}`, {
                method: action === 'delete' ? 'DELETE' : action === 'update' ? 'PUT' : 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
                body: action !== 'delete' ? JSON.stringify(requestBody) : null,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                if (onItemAdded) onItemAdded(data);
                if (action !== 'delete') window.location.reload();
            } else {
                const errorMessage = await response.json()
                setError(errorMessage)
            }
        } catch (e) {
            setError(e.message);
        }
    };

    const validateForm = () => {
        if ((type === 'user' && (!name || !email || (action === 'add' && !password))) ||
            (type === 'project' && (!name || !description || !userId)) ||
            (type === 'task' && (!title || !description || !projectId))) {
            setError('Please fill in all mandatory fields.');
            return false;
        }
        return true;
    };

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/user`, {
                    method: "GET",
                    headers: {
                        "Authorization": `${localStorage.getItem("token")}`,
                    },
                });
                const data = await response.json();
                console.log(data); 
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    setError('Invalid user data.');
                }
            } catch (error) {
                console.error('Error when seeking users:', error);
                setError('It was not possible to carry the list of users.');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (!['user', 'project', 'task'].includes(type)) {
        return <p>Unsupported type</p>;
    }

    return (
        <form className={style.userForms} onSubmit={handleSubmit}>
            <h3>{action} a {type}</h3>
            {action === 'delete' ? (
                <>
                    <label htmlFor="id">ID:</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        placeholder="Enter the ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <button type="submit">Delete</button>
                </>
            ) : (
                <>
                    {action === 'update' && (
                        <>
                            <label htmlFor="id">ID:</label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                placeholder="Enter the ID"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </>
                    )}
                    {type === 'user' && (
                        <>
                            <label htmlFor="name">Nome:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter the name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter the email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter the new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </>
                    )}
                    {type === 'project' && (
                        <>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter the name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="description">Descrição:</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Enter the description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label htmlFor="userId">User ID:</label>
                            {loading ? (
                                <p>Loading Users...</p>
                            ) : (
                                <select
                                    id="userId"
                                    name="userId"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                >
                                    <option value="" disabled>Select a user</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </>
                    )}
                    {type === 'task' && (
                        <>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter the title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label htmlFor="description">Description:</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Enter the description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label htmlFor="projectId">Project ID:</label>
                            <input
                                type="text"
                                id="projectId"
                                name="projectId"
                                placeholder="Enter the project ID"
                                value={projectId}
                                onChange={(e) => setProjectId(e.target.value)}
                            />
                        </>
                    )}
                    <button type="submit">
                        {action === 'add' ? `To add ${type.charAt(0).toUpperCase() + type.slice(1)}` : `To update ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                    </button>
                </>
            )}
            {error && <p className={style.error}>{error.error}</p>}
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