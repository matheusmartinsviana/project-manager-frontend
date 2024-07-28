import React from 'react';
import style from './Styles/DataView.module.css';
import CardInfo from './CardInfo.jsx';
import PropTypes from 'prop-types';

function DataView({ data, path }) {
    return (
        <div className={style.dataViewMainContainer}>
            {data.map((item) => (
                <section key={item.id} className={style.dataViewContainer}>
                    <CardInfo
                        type={path}
                        id={item.id}
                        name={item.name}
                        email={item.email}
                        title={item.title}
                        description={item.description}
                    />
                </section>
            ))}
        </div>
    );
}

DataView.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        email: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
    })).isRequired,
    path: PropTypes.string.isRequired,
};

export default DataView;
