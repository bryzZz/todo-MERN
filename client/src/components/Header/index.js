import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Theme from '../Theme';
import './styles.css';

export default function Header() {
    const { logout } = useContext(AuthContext);

    return (
        <header className="Header">
            <Theme />
            <a className="logo" href="/">TODO</a>
            <button className="logout-btn" onClick={ logout }>Logout</button>
        </header>
    );
}