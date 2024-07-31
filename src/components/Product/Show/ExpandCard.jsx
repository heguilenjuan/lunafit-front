import { useEffect, useState } from 'react';
import './ExpandCard.css';
import { useParams } from 'react-router-dom';

const ExpandCard = () => {
    const { id } = useParams(); // Obtener el id del producto desde la URL
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // Estado inicial con la imagen principal
    const [selectedSize, setSelectedSize] = useState(null); // Estado para el talle seleccionado

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

    const handleSizeClick = (size) => {
        setSelectedSize(size); // Actualiza el estado con el nuevo talle seleccionado
    };

    const phoneNumber = '+542914429530'; // Reemplaza con tu número de teléfono
    const message = `Hola, estoy interesada en el producto *${product?.name}*, quería coordinar para probármelo!.`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <main className="expandCard">
            <div className='containerCard'>
                <div className='boxImageCard'>
                    <span className='ruteCard'>Detalle del producto</span>
                    <div className='boxImage'>
                        <div className='thumbnails'>
                            {/* Miniaturas de imágenes */}
                            {product?.image && (
                                <div onClick={() => handleImageClick(product.image)}>
                                    <img src={product.image} alt="" className='selectImage' />
                                </div>
                            )}
                            {product?.imageOne && (
                                <div onClick={() => handleImageClick(product.imageOne)}>
                                    <img src={product?.imageOne} alt="" className='selectImage' />
                                </div>
                            )}
                            {product?.imageTwo && (
                                <div onClick={() => handleImageClick(product?.imageTwo)}>
                                    <img src={product?.imageTwo} alt="" className='selectImage' />
                                </div>
                            )}
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
                            {product?.name}
                        </h2>
                        <span className='priceInfo'>${product?.price}</span>
                        {product?.offer !== 0 && (
                            <div className='newPrice'>
                                <span className='newPriceText'>${product?.offer}</span>
                                <mark className='porcent'>{product?.offerPercent}%</mark>
                            </div>
                        )}
                    </div>
                    <div className='details'>
                        <h3 className='titleDetails'>Talles:</h3>
                        <div className='detailsSize'>
                            {product?.size.map((size, index) => (
                                <span
                                    key={index}
                                    className={selectedSize === size ? 'active' : ''}
                                    onClick={() => handleSizeClick(size)}
                                >
                                    {size}
                                </span>
                            ))}
                        </div>
                        <div className='boxStock'>
                            <span className='textStock'>Stock</span>
                            <span className='stockNumber'>{product?.stock}</span>
                        </div>
                        {product?.description && (
                            <div className='description'>
                                <h3>Descripción:</h3>
                                <p>{product?.description}</p>
                            </div>
                        )}
                    </div>
                    <a href={url} target="_blank">
                        <button className='btnConsult'>

                            <img src="/icons/whatsapp.svg" alt="iconWhatsapp" width={20} height={20} className='iconFill' />

                            Consultanos
                        </button> </a>
                </div>
            </div>
        </main>
    );
};

export default ExpandCard;
