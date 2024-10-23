import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
            <div className='container-fluid'>
                <Link to='/home' className='navbar-brand'>Luv 2 Read</Link>
                <button className='navbar-toggler' type='button'
                    data-bs-toggle="collapse" data-bs-target='#navbarNavDropdown'
                    aria-controls='navbarNavDropdown' aria-expanded="false"
                    aria-label='Toggle Navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink to='/home' className='nav-link'>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/search' className='nav-link'>Search books</NavLink>
                        </li>
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item m-1'>
                            <NavLink type='button' to='/login' className='btn btn-outline-light'>Sign in</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
