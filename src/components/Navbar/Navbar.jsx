/* eslint-disable no-unused-vars */
import './Navbar.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, getRoleFromToken, clearToken } from '../../utils/auth';
import Cart from '../../assets/icons/cart.svg';
import CartFilled from '../../assets/icons/cart-filled.svg';
import MoonField from '../../assets/icons/moonField.svg';
import Logo from '../../assets/images/logo.webp'
import CarrouselTitle from '../Header/CarrouselTitle/CarrouselTitle';

const Navbar = () => {

    const [hoveredItem, setHoveredItem] = useState(null);
    const navigate = useNavigate();

    const handleMouseEnter = (index) => {
        setHoveredItem(index);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        clearToken();
        navigate('/login');
    };

    const token = getToken();
    const dataToken = token ? getRoleFromToken(token) : null;
    const role = dataToken?.role || null;
    const userId = dataToken?.userId || null;

    const navItems = [
        { text: "INICIO", to: '/' },
        { text: "PRODUCTOS", to: '/products' },
        { text: "CONTACTO", to: '/contact' },
        ...(token ? (
            role === 'admin' ? [
                { text: "PANEL ADMINISTRADOR", to: '/dashboard' },
                { text: "CERRAR SESIÓN", to: '#', onClick: handleLogout }
            ] : [
                { text: "CARRITO", to: `/cart/${userId}` },
                { text: "CERRAR SESIÓN", to: '#', onClick: handleLogout }
            ]
        ) : [
            { text: "LOGIN/REGISTER", to: '/login' }
        ])
    ];

    return (
        <nav className="navbar bg-body-tertiary fixed-top">
            <div className='divCarrousel'>
                <CarrouselTitle/>
            </div>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img className='logo' src={Logo} alt='Logo' />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">LunaFit indumentaria</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {navItems.map((item, index) => (
                                <li className="nav-item" key={index}>
                                    <Link
                                        className={`nav-link ${item.to === window.location.pathname ? 'active' : ''}`}
                                        to={item.to}
                                        onClick={item.onClick}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {/* <form className="d-flex mt-3" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
