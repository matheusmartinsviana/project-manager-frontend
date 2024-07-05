import React from 'react'
import style from './Styles/Footer.module.css'
import { FaGithub, FaLinkedinIn } from "react-icons/fa";


export default function Footer() {
    return (
        <footer className={style.footer}>
            <a href="https://www.linkedin.com/in/matheusmartinsviana/">Developed by @matheusmartinsviana</a>
            <div className={style.mediaSocial}>
                <FaGithub href="https://github.com/matheusmartinsviana" />
            </div>
        </footer>
    )
}