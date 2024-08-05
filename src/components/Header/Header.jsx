import Navbar from '../Navbar/Navbar'
import Logo from '../../assets/images/logo.webp'
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
                    <img className='logo' src={Logo} alt='Logo' />
                </div>
                <Navbar/>
            </header>
        </>
    )
}

export default Header;