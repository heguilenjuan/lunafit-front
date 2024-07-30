import Navbar from '../../Navbar/Navbar';
import CarrouselTitle from './CarrouselTitle/CarrouselTitle';
import './Header.css'

const Header = () => {
    return (
        <>
            <div className='infoGeneral'>
                <CarrouselTitle />
            </div>
            <header className='headerContainer'>
                <div className='boxLogo'>
                    <img className='logo' src='/logo.webp' alt='Logo' />
                </div>
                <Navbar/>
            </header>
        </>
    )
}

export default Header;