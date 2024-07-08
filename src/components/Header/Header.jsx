import './Header.css'

const Header = () => {
    return (
        <header className='headerContainer'>
            <div className='infoGeneral'>
                <span><mark>DESCUBRI</mark> NUESTRO PRODUCTOS.</span>
            </div>
            <div className='boxLogo'>
                <img  className='logo' src='/logo.webp' alt='Logo' />
            </div>
        </header>
    )
}

export default Header;