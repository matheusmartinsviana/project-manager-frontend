import React from 'react';
import style from './Styles/CardInfo.module.css';

export default function CardInfo({ children }) {
    return (
        <div className={style.cardInfo}>
            {children}
        </div>
    )
}