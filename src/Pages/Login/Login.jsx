import React, { useState, useEffect } from 'react';
import style from './Styles/Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegShareFromSquare } from "react-icons/fa6";
import Profile from './Profile';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenExpiry = () => {
            const tokenExpiry = localStorage.getItem('tokenExpiry');
            if (tokenExpiry && new Date().getTime() > tokenExpiry) {
                handleLogout();
            }
        };

        const interval = setInterval(checkTokenExpiry, 10 * 60 * 1000);
        checkTokenExpiry();
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        navigate('/login');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch("https://project-manager-74i7.onrender.com/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const result = await response.json();
            const expiryTime = new Date().getTime() + 36000000;

            setToken(result.token);
            localStorage.setItem('token', result.token);
            localStorage.setItem('tokenExpiry', expiryTime);
            navigate('/')
        } catch (e) {
            setError('Login failed. Please check your email and password.');
        }
    };

    if (token) {
        return <Profile />;
    }

    return (
        <div className={style.loginContainer}>
            <div className={style.loginContent}>
                <div className={style.loginAbout}>
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" height={80} width={80} />
                    <h2>Project Manager</h2>
                    <p>To organize and manage your projects.</p>
                    <a href="https://github.com/matheusmartinsviana/project-manager-frontend" target="_blank" rel="noopener noreferrer">Find out more<FaRegShareFromSquare size={16} /></a>
                </div>
                <div className={style.formFields}>
                    <h4>Login</h4>
                    <form onSubmit={handleSubmit}>
                        <div className={style.formInput}>
                            <input
                                className={style.emailInput}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@example.com"
                                required
                            />
                            <input
                                className={style.passwordInput}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Write your password"
                                required
                            />
                        </div>
                        <div className={style.formButton}>
                            <button className={style.submitButton} type="submit">
                                Login
                            </button>
                            <Link to="/register">
                                <button className={style.registerButton}>
                                    Register
                                </button>
                            </Link>
                        </div>
                        {error && <div className={style.error}>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}