import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, getRoleFromToken, clearToken } from '../../utils/auth';
import Cart from '../../assets/icons/cart.svg';
import Logo from '../../assets/images/logo.webp';
import CarrouselTitle from '../Header/CarrouselTitle/CarrouselTitle';
import { useSelector } from 'react-redux';
import { setUserData } from '../../redux/userSlice';

const Navbar = () => {
    const navigate = useNavigate();

    const handleMouseEnter = (index) => {
        setHoveredItem(index);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const handleLogout = () => {
        clearToken();
        navigate('/login');
    };

    const reduxData = useSelector(setUserData);
    const userData = reduxData?.payload?.user?.userData || null;

    const token = getToken();
    const dataToken = token ? getRoleFromToken(token) : null;
    const role = dataToken?.role || null;

    const navItems = [
        { text: "INICIO", to: '/' },
        { text: "PRODUCTOS", to: '/products' },
        { text: "QUIENES SOMOS", to: '/conocenos' },
        { text: "POLITICAS DE ENVIO", to: '/shipping' },
        ...(token ? (
            role === 'admin' ? [
                { text: "PANEL ADMINISTRADOR", to: '/dashboard' },
                { text: "CERRAR SESIÓN", to: '#', onClick: handleLogout }
            ] : [
                { text: "CARRITO", to: `/cart/${userData?.cart || ''}` },
                { text: "CERRAR SESIÓN", to: '#', onClick: handleLogout }
            ]
        ) : [
            { text: "LOGIN/REGISTER", to: '/login' }
        ])
    ];

    const handleNavLinkClick = (to, onClick) => {
        if (onClick) {
            onClick();  // Ejecuta la función onClick, en este caso handleLogout
        } else {
            // Cerrar el offcanvas
            const offcanvasElement = document.getElementById('offcanvasNavbar');
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (offcanvas) {
                offcanvas.hide();
            }

            // Redirigir a la página
            navigate(to);
        }
    };

    return (
        <nav className="navbar bg-body-tertiary fixed-top">
            <div className='divCarrousel'>
                <CarrouselTitle />
            </div>
            <div className="container-fluid navContainer">
                <Link className="navbar-brand" to="/">
                    <img className='logo' src={Logo} alt='Logo' />
                </Link>
                <div className="navbar-content">
                    {token && (
                        <div className='box-cart'>
                            <span>¡Bienvenido {userData?.firstName} {userData?.lastName}!</span>
                            <Link to={`/cart/${userData?.cart || ''}`}>
                                <img src={Cart} alt="Cart" width={25} height={25} />
                            </Link>
                        </div>
                    )}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">LunaFit indumentaria</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                {navItems.map((item, index) => (
                                    <li className="nav-item" key={index}>
                                        <Link
                                            className={`nav-link ${item.to === window.location.pathname ? 'active' : ''}`}
                                            to={item.to}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNavLinkClick(item.to, item.onClick);
                                            }}
                                            onMouseEnter={() => handleMouseEnter(index)}
                                            onMouseLeave={() => handleMouseLeave()}
                                        >
                                            {item.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
