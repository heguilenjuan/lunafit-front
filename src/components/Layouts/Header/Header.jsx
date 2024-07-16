import CarrouselTitle from './CarrouselTitle/CarrouselTitle';
import './Header.css'

const Header = () => {
    return (
        <header className='headerContainer'>
            <div className='infoGeneral'>
                <CarrouselTitle/>
            </div>
            <div className='boxLogo'>
                <img  className='logo' src='/logo.webp' alt='Logo' />
            </div>
        </header>
    )
}

export default Header;