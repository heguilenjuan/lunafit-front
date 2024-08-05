import './Navbar.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, getRoleFromToken, clearToken } from '../../utils/auth';


import MoonField from '../../assets/icons/moonField.svg'
const Navbar = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
    const role = token ? getRoleFromToken(token) : null;

    const navItems = [
        { text: "INICIO", icon: "/icons/moon.svg", iconHovered: MoonField, to: '/' },
        { text: "PRODUCTOS", icon: "/icons/moon.svg", iconHovered: MoonField, to: '/products' },
        { text: "CONTACTO", icon: "/icons/moon.svg", iconHovered: MoonField, to: '/contact' },
        ...(token ? [
            role === 'admin' ? { text: "PANEL ADMINISTRADOR", icon: "/icons/moon.svg", iconHovered: MoonField, to: '/dashboard' } : null,
            { text: "CERRAR SESIÓN", icon: "/icons/moon.svg", iconHovered: MoonField, to: '#', onClick: handleLogout }
        ] : [
            { text: "LOGIN/REGISTER", icon: "/icons/moon.svg", iconHovered: MoonField, to: '/login' }
        ])
    ].filter(Boolean);

    return (
        <nav className='navContainer'>
            {isMobile ? (
                <div className="btn-group">
                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Menú
                    </button>
                    <ul className="dropdown-menu">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link className='navItems' to={item.to} onClick={item.onClick}>
                                    <img
                                        src={hoveredItem === index ? item.iconHovered : item.icon}
                                        alt="moonSvg"
                                        width={15}
                                        height={15}
                                    />
                                    <p>{item.text}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <ul className='navList'>
                    {navItems.map((item, index) => (
                        <li
                            key={index}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link className='navItems' to={item.to} onClick={item.onClick}>
                                <img
                                    src={hoveredItem === index ? item.iconHovered : item.icon}
                                    alt="moonSvg"
                                    width={15}
                                    height={15}
                                />
                                <p>{item.text}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
