import React from 'react'
import style from './Styles/Button.module.css'

export default function Button(props) {
    const { type = 'button', onClick, children, ...rest } = props

    return (
        <button
            type={type}
            onClick={onClick}
            className={style.styleButton}
            {...rest}
        >
            {children}
        </button>
    )
}
