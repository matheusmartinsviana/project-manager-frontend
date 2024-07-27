import React from 'react';
import style from './Styles/CardUserInfo.module.css';

export default function CardUserInfo(props) {
    const { type, id, name, email, title, description } = props;

    let content;

    switch (type) {
        case 'user':
            content = (
                <div className={style.cardContent}>
                    <h3>User Details</h3>
                    <p><strong>ID:</strong> {id}</p>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                </div>
            );
            break;
        case 'project':
            content = (
                <div className={style.cardContent}>
                    <h3>Project Details</h3>
                    <p><strong>ID:</strong> {id}</p>
                    <p><strong>Title:</strong> {title}</p>
                    <p><strong>Description:</strong> {description}</p>
                </div>
            );
            break;
        case 'task':
            content = (
                <div className={style.cardContent}>
                    <h3>Task Details</h3>
                    <p><strong>ID:</strong> {id}</p>
                    <p><strong>Title:</strong> {title}</p>
                    <p><strong>Description:</strong> {description}</p>
                </div>
            );
            break;
    }

    return (
        <article className={style.info}>
            {content}
        </article>
    );
}