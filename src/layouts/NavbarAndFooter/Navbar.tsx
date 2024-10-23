import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SpinnerLoading } from '../Utils/SpinnerLoading';

export const Navbar = () => {

    const { oktaAuth, authState } = useOktaAuth();

    if (!authState) {
        return <SpinnerLoading />
    }

    const handleLogout = async () => oktaAuth.signOut();

    console.log(authState)

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
                        {authState.isAuthenticated ?
                            <li>
                                <button className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
                            </li> :
                            <li className='nav-item m-1'>
                                <Link type='button' to='/login' className='btn btn-outline-light'>Sign in</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}
