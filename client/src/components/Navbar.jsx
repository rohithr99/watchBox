import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Navbar.css';

const Navbar = () => {

    const location = useLocation();
    const routesToHideNavbar = ['/', '/signup'];

    if (routesToHideNavbar.includes(location.pathname)) {
        return null;
    }

    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <nav className='w-full bg-red-400'>
            <Link to="/home" className='title'>WatchBox</Link>   
            <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
                <div className='sp'> <pre>     </pre> </div>
                <div className='sp'></div>
                <div className='sp'></div>
            </div>
                <ul className={menuOpen ? "open": ""}>
                    <li>
                        <NavLink to="/watchlist">Watchlist</NavLink>
                    </li>
                    <li>
                        <NavLink to="/watched">Watched</NavLink>
                    </li>
                    <li>
                        <NavLink to="/account">Account</NavLink>
                    </li>
                    <li>
                    <button className='mx-5 bg-black text-white'>Logout</button>
                    </li>
                </ul>
        </nav>
    )
}

export default Navbar
