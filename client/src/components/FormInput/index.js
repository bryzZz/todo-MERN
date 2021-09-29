import React from 'react';
import './styles.css';

export default function FormInput({register, error, label, name, ...inputProps}) {
    return (
        <div className="form__input-wrapper">
            <div className={`form__div${error ? ' is-invalid' : ''}`}>
                <input
                    className="form__input"
                    placeholder=" "
                    { ...register(name) }
                    name={ name }
                    {...inputProps}
                />
                <label className="form__label">{ label }</label>
            </div>
            <div className="invalid-feedback">{ error?.message }</div>
        </div>
    );
}