import React from 'react';
import style from './Styles/DataView.module.css';
import CardUserInfo from './User/CardUserInfo';

export default function DataView(props) {
    const { data, type } = props;

    return (
        <section className={style.dataViewContainer}>
                {data.map((item) => (
                    <div key={item.id} className={style.cardWrapper}>
                        <CardUserInfo
                            type={props.path}
                            id={item.id}
                            name={item.name}
                            email={item.email}
                            title={item.title}
                            description={item.description}
                        />
                    </div>
                ))}
        </section>
    );
}