import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ExpandCard.css';

const ExpandCard = () => {
    const { id } = useParams(); // Obtener el id del producto desde la URL
    const products = useSelector((state) => state.products.items);
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        const fetchedProduct = products.find(product => product._id === id);
        if (fetchedProduct) {
            setProduct(fetchedProduct);
            setSelectedImage(fetchedProduct.image);
        }
    }, [id, products]);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const phoneNumber = '+542914429530';
    const message = `Hola, estoy interesada en el producto *${product?.name}*, quería coordinar para probármelo!.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    if (!product) {
        return <div>Loading...</div>;
    }

    const handlePrice = (price, offer) => {
        let newPrice = price - (offer * price) / 100;
        newPrice = Math.round(newPrice);
        return newPrice;
    };

    return (
        <main className="expandCard">
            <div className='containerCard'>
                <div className='boxImageCard'>
                    <span className='ruteCard'>Detalle del producto</span>
                    <div className='boxImage'>
                        <div className='thumbnails'>
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
                        <div>
                            <img src={selectedImage} alt="selected" className='imageSelected' />
                        </div>
                    </div>
                </div>
                <div className='boxInfoCard'>
                    <div className='info'>
                        <h2 className='textInfo'>{product?.name}</h2>
                        {product?.offer !== 0 ? (
                            <div className='priceInfo'>
                                <span className='oldPrice'>${product?.price}</span>
                                <div className='newPrice'>
                                    <span className='newPriceText'>
                                        ${handlePrice(product.price, product.offer)}
                                    </span>
                                    <mark className='porcent'>{product?.offer}%</mark>
                                </div>
                                <div className='offerDuration'>
                                    {`Oferta válida desde 01/08/24 hasta 31/08/24`}
                                </div>
                            </div>
                        ) : (
                            <span className='priceInfo newPriceText'>${product?.price}</span>
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
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <button className='btnConsult'>
                            <img src="/icons/whatsapp.svg" alt="iconWhatsapp" width={20} height={20} className='iconFill' />
                            Consultanos
                        </button>
                    </a>
                </div>
            </div>
        </main>
    );
};

export default ExpandCard;
