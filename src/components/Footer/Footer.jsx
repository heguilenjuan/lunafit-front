import './Footer.css'


//SVG
import FacebookSvg from '../../assets/icons/facebook.svg';
import InstagramSvg from '../../assets/icons/instagram.svg';
import WhatsappSvg from '../../assets/icons/whatsapp.svg';
import CashSvg from '../../assets/icons/cash.svg';
import MpSvg from '../../assets/icons/mpsvg.svg'

const Footer = () => {
    const phoneNumber = '+542914429530'; // Reemplaza con tu número de teléfono
        const message = 'Hola, que tal!! vengo desde la pagina, me gustaría más información.';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    return (
        <footer className='boxFooter'>
            <div className='networksFooter'>
                <div className='boxContactFooter'>
                    <h3>Nuestras redes</h3>
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
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                Whatssap
                            </a>

                        </li>
                    </ul>
                </div>
                <div className='boxPayFooter'>
                    <h3>Medios de pago</h3>
                    <ul className='listContactFooter' >
                        <li className='itemListFooter'>
                            <img src={CashSvg} alt='Efectivo' width={20} height={20} />
                            <p>Efectivo</p>

                        </li>
                        <li className='itemListFooter'>
                            <img src={MpSvg} alt='mercadoPago' width={20} height={20} />
                            <p>Trasferencia</p>

                        </li>
                    </ul>

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