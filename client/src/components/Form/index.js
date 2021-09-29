import React from 'react';
import './styles.css';

export default function Form({children, ...props}) {
    return (
        <form className="customForm" {...props} noValidate>{children}</form>
    );
}