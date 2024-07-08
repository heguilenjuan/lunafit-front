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
                                <img src="logo.webp" alt="" className='selectImage'/></div>
                            <div>
                                <img src="vite.svg" alt="" className='selectImage'/></div>
                        </div>
                        <div>
                            <img src="/asd.webp" alt="asd"  className='imageSelected'/>
                        </div>
                    </div>
                </div>
                <div className='boxInfoCard'>
                    <div className='info'>
                        <h3>
                        TOP SEAMLESS DALLAS (CAPSULA LUFIT)
                        </h3>
                        <span>Product price</span>
                        <span>descuento si existe</span>
                    </div>
                    <div className='details'>
                        <span>Talle</span>
                        <div>
                            iconos de talles
                        </div>
                        <div>
                            stock
                        </div>
                    </div>
                    <div className='btnCard'>
                        <button>Consultanos</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ExpandCard