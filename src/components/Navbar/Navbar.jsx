import './Navbar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredItem(index);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const navItems = [
        { text: "INICIO", icon: "/icons/moon.svg", iconHovered: "/icons/moonField.svg", to: '/' },
        { text: "PRODUCTOS", icon: "/icons/moon.svg", iconHovered: "/icons/moonField.svg", to: '/products' },
        { text: "CONTACTO", icon: "/icons/moon.svg", iconHovered: "/icons/moonField.svg", to: '/contact' },
        { text: "LOGIN/REGISTER", icon: "/icons/moon.svg", iconHovered: "/icons/moonField.svg", to: '/login' }
    ];

    return (
        <nav className='navContainer'>
            <ul className='navList'>
                {navItems.map((item, index) => (
                    <li
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link className='navItems' to={item.to}>
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
        </nav>
    );
};

export default Navbar;
