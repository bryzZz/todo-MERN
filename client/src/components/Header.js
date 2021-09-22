import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
    const { logout, isAuthenticated } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a href="/" className="navbar-brand">TODO</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex mx-auto">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>
                {
                    isAuthenticated
                    &&
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="/"
                                onClick={logout}
                            >Logout</a>
                        </li>
                    </ul>
                }
            </div>
        </nav>
    );
}
