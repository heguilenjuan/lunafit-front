import './Footer.css'

const Footer = () => {
    return (
        <footer className='boxFooter'>
            <div className='networksFooter'>
                <div className='boxContactFooter'>
                    <h3>Nuestras redes</h3>
                    <ul className='listContactFooter'>
                        <li className='itemListFooter'>
                            <img src='/icons/instagram.svg' alt='insta' width={20} height={20} />
                            <a href="https://www.instagram.com/luna.fit.ind/" target="_blank" rel="noopener noreferrer">
                                Instagram
                            </a>

                        </li>
                        <li className='itemListFooter'>
                            <img src='/icons/facebook.svg' alt='meta' width={20} height={20} />
                            <a href="https://www.facebook.com/profile.php?id=61563566730373" target="_blank" rel="noopener noreferrer">
                                Facebook
                            </a>


                        </li>
                        <li className='itemListFooter'>
                            <img src='/icons/whatsapp.svg' alt='whatsappSVG' width={20} height={20} />
                            <a href="http://" target="_blank" rel="noopener noreferrer">
                                Whatssap
                            </a>

                        </li>
                    </ul>
                </div>
                <div className='boxPayFooter'>
                    <h3>Medios de pago</h3>
                    <ul className='listContactFooter' >
                        <li className='itemListFooter'>
                            <img src='/icons/cash.svg' alt='Efectivo' width={20} height={20} />
                            <p>Efectivo</p>

                        </li>
                        <li className='itemListFooter'>
                            <img src='/icons/mpsvg.svg' alt='mercadoPago' width={20} height={20} />
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