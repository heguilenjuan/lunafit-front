import Navbar from '../Navbar/Navbar';

//Styles
import './Header.scss';

const Header = () => {
    return (
        <>
            <div className='infoGeneral'>
            </div>
            <header className='headerContainer'>
                <Navbar/>
            </header>
        </>
    )
}

export default Header;