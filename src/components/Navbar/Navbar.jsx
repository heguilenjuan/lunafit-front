import './Navbar.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, getRoleFromToken, clearToken } from '../../utils/auth';

const Navbar = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const navigate = useNavigate();

    const handleMouseEnter = (index) => {
        setHoveredItem(index);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const handleLogout = () => {
        clearToken(); // Limpiar el token
        navigate('/login'); // Redirigir a la página de inicio de sesión
    };

    const token = getToken();
    const role = token ? getRoleFromToken(token) : null;

    const navItems = [
        { text: "INICIO", icon: "/icons/moon.svg", iconHovered: "/icons/moonField.svg", to: '/' },
        { text: "PRODUCTOS", icon: "/icons/moon.svg", iconHovered: "/icons/moonField.svg", to: '/products' },
        { text: "CONTACTO", icon: "/icons/moon.svg", iconHovered: "/icons/moonField.svg", to: '/contact' },
        // Cambia los elementos según el estado de la sesión
        ...(token ? [
            role === 'admin' ? { text: "PANEL ADMINISTRADOR", icon: "/icons/moon.svg", iconHovered: "/icons/moonField.svg", to: '/dashboard' } : null,
            { text: "CERRAR SESIÓN", icon: "/icons/moon.svg", iconHovered: "/icons/moonField.svg", to: '#', onClick: handleLogout }
        ] : [
            { text: "LOGIN/REGISTER", icon: "/icons/moon.svg", iconHovered: "/icons/moonField.svg", to: '/login' }
        ])
    ];

    return (
        <nav className='navContainer'>
            <ul className='navList'>
                {navItems.map((item, index) => (
                    item ? (
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
                    ) : null
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
