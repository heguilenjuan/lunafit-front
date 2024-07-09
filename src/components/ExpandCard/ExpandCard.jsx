import './ExpandCard.css'
const ExpandCard = () => {
    return (
        <main className="expandCard">

            <div className='containerCard'>

                <div className='boxImageCard'>
                    <span className='ruteCard'>incio/tops/etc</span>
                    <div className='boxImage'>
                        <div >
                            <div>
                                <img src="asd.webp" alt="" className='selectImage' />
                            </div>
                            <div>
                                <img src="logo.webp" alt="" className='selectImage' /></div>
                            <div>
                                <img src="vite.svg" alt="" className='selectImage' /></div>
                        </div>
                        <div>
                            <img src="/asd.webp" alt="asd" className='imageSelected' />
                        </div>
                    </div>
                </div>
                <div className='boxInfoCard'>
                    <div className='info'>
                        <h2 className='textInfo'>
                            TOP SEAMLESS DALLAS (CAPSULA LUFIT)
                        </h2>
                        <span className='priceInfo'>$45000</span>
                        <div className='newPrice'>

                            <span className='newPriceText'>$35000</span>
                            <mark className='porcent'>20%</mark>
                        </div>
                    </div>
                    <div className='details'>
                        <h3 className='titleDetails'>Talles:</h3>
                        <div className='detailsSize'>
                            <div className='boxSize'>S</div>
                            <div className='boxSize'>M</div>
                            <div className='boxSize'>L</div>
                            <div className='boxSize'>XL</div>
                        </div>
                        <div className='boxStock'>
                            <span className='textStock'>Stock</span>
                            <span className='stockNumber'>10</span>
                        </div>
                    </div>
                    
                  <button className='btnConsult'> <img src="/icons/whatsapp.svg" alt="iconWhatsapp" width={20} height={20} className='iconFill' />Consultanos</button>
                </div>
            </div>
        </main>
    )
}

export default ExpandCard