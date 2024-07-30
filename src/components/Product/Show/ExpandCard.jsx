import { useEffect, useState } from 'react';
import './ExpandCard.css';
import { useParams } from 'react-router-dom';

const ExpandCard = () => {
    const { id } = useParams(); // Obtener el id del producto desde la URL
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // Estado inicial con la imagen principal

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                // Suponiendo que obtienes los datos del producto de alguna fuente de datos
                const response = await fetch(`https://backluna.vercel.app/api/product/${id}`, {
                    method: 'GET'
                });
                const data = await response.json();
                setProduct(data); // Guardar los datos del producto en el estado local
                setSelectedImage(data.image); // Establecer la imagen principal al cargar los datos del producto
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        getProductDetails();
    }, [id]);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl); // Actualiza el estado con la nueva imagen seleccionada
    };

    if (!product) {
        return <div>Loading...</div>; // Puedes mostrar un indicador de carga mientras se obtienen los datos del producto
    }
    console.log(product)

    return (
       <>
        <main className="expandCard">
            <div className='containerCard'>
                <div className='boxImageCard'>
                    <span className='ruteCard'>inicio/tops/etc</span>
                    <div className='boxImage'>
                        <div className='thumbnails'>
                            {/* Miniaturas de imágenes */}
                            <div onClick={() => handleImageClick(product.image)}>
                                <img src={product.image} alt="" className='selectImage' />
                            </div>
                            <div onClick={() => handleImageClick(product.imageOne)}>
                                <img src={product.imageOne} alt="" className='selectImage' />
                            </div>
                            <div onClick={() => handleImageClick(product.imageTwo)}>
                                <img src={product.imageTwo} alt="" className='selectImage' />
                            </div>
                        </div>
                        {/* Imagen principal seleccionada */}
                        <div>
                            <img src={selectedImage} alt="selected" className='imageSelected' />
                        </div>
                    </div>
                </div>
                <div className='boxInfoCard'>
                    <div className='info'>
                        <h2 className='textInfo'>
                            {product.name}
                        </h2>
                        <span className='priceInfo'>${product.price}</span>
                        <div className='newPrice'>
                            <span className='newPriceText'>${product.offer}</span>
                            <mark className='porcent'>{product.offerPercent}%</mark>
                        </div>
                    </div>
                    <div className='details'>
                        <h3 className='titleDetails'>Talles:</h3>
                        <div className='detailsSize'>
                            
                        </div>
                        <div className='boxStock'>
                            <span className='textStock'>Stock</span>
                            <span className='stockNumber'>{product.stock}</span>
                        </div>
                    </div>
                    <button className='btnConsult'>
                        <img src="/icons/whatsapp.svg" alt="iconWhatsapp" width={20} height={20} className='iconFill' />
                        Consultanos
                    </button>
                </div>
            </div>
        </main>
       </>
    );
};

export default ExpandCard;
