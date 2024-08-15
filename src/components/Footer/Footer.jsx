//React Router
import { NavLink } from 'react-router-dom';

//SVG
import FacebookSvg from '../../assets/icons/facebook.svg';
import InstagramSvg from '../../assets/icons/instagram.svg';
import WhatsappSvg from '../../assets/icons/whatsapp.svg';
import CashSvg from '../../assets/icons/cash.svg';
import MpSvg from '../../assets/images/logo-mp.png';
import PhoneSvg from '../../assets/icons/phone.svg';
import MailSvg from '../../assets/icons/mail.svg';


//Styles
import './Footer.scss';


const Footer = () => {
    const phoneNumber = '+542914429530'; // Reemplaza con tu número de teléfono
    const message = 'Hola, que tal!! vengo desde la pagina, me gustaría más información.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    const mailTo = 'mailto:lunafitt@hotmail.com'; // Reemplaza con tu dirección de correo electrónico

    return (
        <footer className='boxFooter'>
            <div className='networksFooter'>
                <div className='boxNavigate'>
                    <h3>Navegacion</h3>
                    <NavLink to={'/conocenos'}>Conocenos</NavLink>
                    <NavLink to={'/change-policy'}>Politicas de cambio</NavLink>
                    <NavLink to={'/login'}>Iniciar sesión</NavLink>
                </div>
                <div className='boxContactFooter'>
                    <h3>Redes Sociales</h3>
                    <ul className='listContactFooter'>
                        <li className='itemListFooter'>
                            <img src={InstagramSvg} alt='insta' width={20} height={20} />
                            <a href="https://www.instagram.com/luna.fit.ind/" target="_blank" rel="noopener noreferrer">
                                Instagram
                            </a>
                        </li>
                        <li className='itemListFooter'>
                            <img src={FacebookSvg} alt='meta' width={20} height={20} />
                            <a href="https://www.facebook.com/profile.php?id=61563566730373" target="_blank" rel="noopener noreferrer">
                                Facebook
                            </a>
                        </li>
                        <li className='itemListFooter'>
                            <img src={WhatsappSvg} alt='whatsappSVG' width={20} height={20} />
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                Whatsapp
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='boxPayFooter'>
                    <h3>Medios de pago</h3>
                    <div>
                        <span>
                            <img src={CashSvg} alt='Efectivo' width={20} height={20} />
                        </span>
                        <span>
                            <img src={MpSvg} alt='mercadoPago' width={35} height={35} />
                        </span>
                    </div>
                </div>
                <div className='boxContact'>
                    <h3>Contactanos</h3>
                    <span>
                        <img src={PhoneSvg} alt="phoneSvg" width={20} height={20} />
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">+54 291 442 9530</a>
                    </span>
                    <span>
                        <img src={MailSvg} alt="mailSvg" width={20} height={20} />
                        <a href={mailTo}>lunafitt@hotmail.com</a>
                    </span>
                </div>
            </div>

            <div className='infoFooter'>
                <span className='textFooter'>Copyright LunaFit - 2024. Todos los derechos reservados. </span>
                <span className='textFooter'>creado con react js jphdev</span>
            </div>
        </footer>
    )
}

export default Footer;
