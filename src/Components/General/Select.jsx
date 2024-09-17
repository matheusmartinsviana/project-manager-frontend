import React from 'react';
import './Styles/Select.css';

const Select = ({ children, ...props }) => {
    return (
        <select style={{ width: "200px" }} className="dropdown" {...props}>
            {children}
        </select>
    );
};

export default Select;