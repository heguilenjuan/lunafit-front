import './Navbar.css';


const Navbar = () => {
    return (
        <nav className='navContainer'>
            <ul className='navList'>
                <li className='navItems'>
                    <img src="/icons/moon.svg" alt="moonSvg" width={15} height={15} />
                    <p>INICIO</p>
                </li>
                <li className='navItems'>
                    <img src="/icons/moon.svg" alt="moonSvg" width={15} height={15} />
                    <p>PRODUCTOS</p>
                </li>
                <li className='navItems'>
                    <img src="/icons/moon.svg" alt="moonSvg" width={15} height={15} />
                    <p>CONTACTO</p>
                </li>
                <li className='navItems'>
                    <img src="/icons/moon.svg" alt="moonSvg" width={15} height={15} />
                    <p>CONSULTA</p>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;