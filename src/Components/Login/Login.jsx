import React, { useState, useEffect } from 'react'
import style from './Styles/Login.module.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        const checkTokenExpiry = () => {
            const tokenExpiry = localStorage.getItem('tokenExpiry')
            if (tokenExpiry && new Date().getTime() > tokenExpiry) {
                handleLogout()
            }
        }

        const interval = setInterval(checkTokenExpiry, 10 * 60 * 1000) // ms
        checkTokenExpiry()
        return () => clearInterval(interval)
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch("http://localhost:8000/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const result = await response.json()
            const expiryTime = new Date().getTime() + 36000000
            setToken(result.token)
            localStorage.setItem('token', result.token)
            localStorage.setItem('tokenExpiry', expiryTime)
        } catch (e) {
            console.error('Error: ', e)
        }
    }

    const handleLogout = () => {
        setToken('')
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpiry')
    }

    return (
        <>
            {!token ?
                <form onSubmit={handleSubmit}>
                    <div>
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
                            placeholder="Write a strong password"
                            required
                        />
                    </div>
                    <button className={style.submitButton} type="submit">
                        Login
                    </button>
                </form>
                :
                <button onClick={handleLogout}>Logout</button>
            }
        </>
    )
}