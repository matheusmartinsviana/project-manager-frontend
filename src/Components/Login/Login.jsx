import React, { useState } from 'react'
import style from './Styles/Login.module.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')

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
            setToken(result.token)
            
        } catch (e) {
            console.error('Error: ', e)
        }

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
                            placeholder="email@dominio.com"
                            required
                        />
                        <input
                            className={style.passwordInput}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite uma senha forte"
                            required
                        />
                    </div>
                    <button className={style.submitButton} type="submit">
                        Login
                    </button>
                </form> : <h1>logado</h1>
            }
        </>
    )
}