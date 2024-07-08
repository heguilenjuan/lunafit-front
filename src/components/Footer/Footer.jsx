import './Footer.css'

const Footer = () => {
    return (
        <div className='boxFooter'>
            <div className='firstPart'>
                <div className='sectionContacts'>
                    <h3>Contactanos</h3>
                    <div>
                        <img src="" alt="" />
                        <span>Instagram</span>
                    </div>
                    <div>
                        <img src="" alt="" />
                        <span>Whatsap</span>
                    </div>
                    <div>
                        <img src="" alt="" />
                        <span>Facebook</span>
                    </div>

                </div>
                <div className='buy'>
                    <h3>Medios de pagos</h3>
                    <div>
                        <img src="" alt="" />
                        <span>Efectivo</span>
                    </div>
                    <div>
                        <img src="" alt="" />
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