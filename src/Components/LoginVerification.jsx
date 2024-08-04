import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './Styles/LoginVerificaion.module.css'

export default function LoginVerificaion() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            navigate('/project-manager-frontend/login');
        }
    }, []);

    if (!isLoggedIn) {
        return navigate('login');
    }

    return (
        <>
        </>
    )
}