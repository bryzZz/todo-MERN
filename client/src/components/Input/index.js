import React from 'react';
import './styles.css';

export default function Input({register, error, label, name, ...inputProps}) {
    return (
        <div className="form-group mb-2">
            <label>{ label }</label>
            <input
                className={ `form-control ${error ? 'is-invalid' : ''}` }
                { ...register(name) }
                name={ name }
                {...inputProps}
            />
            <div className="invalid-feedback">{ error?.message }</div>
        </div>
    )
}