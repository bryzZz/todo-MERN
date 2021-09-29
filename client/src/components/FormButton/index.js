import React from 'react';
import './styles.css';

export default function FormButton({ children, ...props }) {
    return <button className='FormButton' {...props}>{ children }</button>;
}
