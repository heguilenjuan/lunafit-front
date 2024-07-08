import './Footer.css'

const Footer = () => {
    return (
        <div className='boxFooter'>
            <div className='firstPart'>
                <div className='sectionContacts'>
                    <h3>Contactanos</h3>
                    <div>
                        <img src="/icons/instagram.svg" alt="instagramIcon" width={20} height={20} />
                        <span>Instagram</span>
                    </div>
                    <div>
                        <img src="/icons/whatsapp.svg" alt="iconWhatsapp" width={20} height={20} />
                        <span>Whatsap</span>
                    </div>
                    <div>
                    <img src="/icons/facebook.svg" alt="iconFace" width={20} height={20} />
                        <span>Facebook</span>
                    </div>

                </div>
                <div className='buy'>
                    <h3>Medios de pagos</h3>
                    <div>
                        <img src="/icons/cash.svg" alt="iconCash" width={20} height={20}/>
                        <span>Efectivo</span>
                    </div>
                    <div>
                        <img src="/icons/mpsvg.svg" alt="iconMp" width={22} height={22} />
                        <span>Transferencia</span>
                    </div>
                </div>
            </div>
            <div className='infoFooter'>
                <span>Copyright LunaFit - 2024. Todos los derechos reservados. </span>
                <span>creado con react js jphdev</span>
            </div>

        </div>
    )
}

export default Footer