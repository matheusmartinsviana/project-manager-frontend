import React, { useEffect, useState } from 'react';
import style from './Styles/Forms.module.css';
import { useNavigate } from 'react-router-dom';

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
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

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
                if (onItemAdded) onItemAdded(data);
                navigate("/");
            } else {
                const errorMessage = await response.json();
                setError(errorMessage.error);
            }
        } catch (e) {
            setError(e.message);
        }
    };

    const validateForm = () => {
        if ((type === 'user' && (!name || !email || (action === 'add' && !password))) ||
            (type === 'project' && (!name || !description || !userId)) ||
            (type === 'task' && (!title || !description || !projectId))) {
            setError('Por favor, preencha todos os campos obrigatórios.');
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
                console.log(data); // Log the data to see its structure
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    setError('Dados de usuários inválidos.');
                }
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                setError('Não foi possível carregar a lista de usuários.');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (!['user', 'project', 'task'].includes(type)) {
        return <p>Tipo não suportado</p>;
    }

    return (
        <form className={style.userForms} onSubmit={handleSubmit}>
            <h3>{action} {type}</h3>
            {error && <p className={style.error}>{error}</p>}
            {action === 'delete' ? (
                <>
                    <label htmlFor="id">ID:</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        placeholder="Digite o ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <button type="submit">Excluir</button>
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
                                placeholder="Digite o ID"
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
                                placeholder="Digite o nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Digite o email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="password">Senha:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Digite a nova senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </>
                    )}
                    {type === 'project' && (
                        <>
                            <label htmlFor="name">Nome:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Digite o nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="description">Descrição:</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Digite a descrição"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label htmlFor="userId">ID do Usuário:</label>
                            {loading ? (
                                <p>Carregando usuários...</p>
                            ) : (
                                <select
                                    id="userId"
                                    name="userId"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                >
                                    <option value="" disabled>Selecione um usuário</option>
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
                            <label htmlFor="title">Título:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Digite o título"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label htmlFor="description">Descrição:</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Digite a descrição"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label htmlFor="projectId">ID do Projeto:</label>
                            <input
                                type="text"
                                id="projectId"
                                name="projectId"
                                placeholder="Digite o ID do projeto"
                                value={projectId}
                                onChange={(e) => setProjectId(e.target.value)}
                            />
                        </>
                    )}
                    <button type="submit">
                        {action === 'add' ? `Adicionar ${type.charAt(0).toUpperCase() + type.slice(1)}` : `Atualizar ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                    </button>
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
