import React from 'react';
import style from './Styles/CardInfo.module.css';
import PropTypes from 'prop-types';

function CardInfo({ type, id, name, email, title, description }) {
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
                    <p><strong>Title:</strong> {name}</p>
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
        default:
            content = (
                <div className={style.cardContent}>
                    <h3>Unknown Type</h3>
                    <p>Content not available for this type.</p>
                </div>
            );
    }

    return (
        <article className={style.info}>
            {content}
        </article>
    );
}

CardInfo.propTypes = {
    type: PropTypes.oneOf(['user', 'project', 'task']).isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
};

export default CardInfo