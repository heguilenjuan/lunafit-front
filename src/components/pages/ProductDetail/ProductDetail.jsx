/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById } from '../../../redux/productsSlice';
import { addToCart } from '../../../redux/cartSlice';
import './ProductDetail.css';
import Whatsapp from '../../../assets/icons/whatsapp.svg';
import Spinner from '../../Spinner/Spinner';

import Swal from 'sweetalert2';
import { getToken } from '../../../utils/auth';
import NavDetail from './Nav/NavDetail';
import { fetchData } from '../../../utils/api';

const ProductDetail = () => {
    const { id } = useParams();
    //redux
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

    //estados
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null);

    //llama al producto por el id
    useEffect(() => {
        const fetchedProduct = products.find(product => product._id === id);
        if (fetchedProduct) {
            setProduct(fetchedProduct);
            setSelectedImage(fetchedProduct.image);
        } else {
            dispatch(fetchProductById(id)).then((response) => {
                if (response.payload) {
                    setProduct(response.payload);
                    setSelectedImage(response.payload.image);
                }
            });
        }
    }, [id, products, dispatch]);

    //setea las imagenes para el cambio 
    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    //setea el size selecionado
    const handleSizeClick = (size) => {
        setSelectedSize(size);
        const sizeDetails = product?.sizes.find(sizeAndStock => sizeAndStock.size === size);
        setSelectedStock(sizeDetails?.stock || 0);
    };

    //mensaje determinado para enviar al whatsap
    const phoneNumber = '+542914429530';
    const message = `Hola, estoy interesada en el producto *${product?.name}*, quería coordinar para probármelo!.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const handleAddToCart = async () => {
        if (!selectedSize) {
            Swal.fire('Error', 'Por favor, selecciona un talle antes de añadir al carrito.', 'error');
            return;
        }

        const token = getToken();
        if (!token) {
            Swal.fire('Error', 'Inicia sesion para agregar al carrito.', 'error');
            return;
        }

        const productData = {
            productId: product._id,
            size: selectedSize,
            quantity: 1,
        };

        try {
            const data = await fetchData('api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });

            Swal.fire({
                position: 'bottom-end',
                icon: 'success',
                text: 'Agregado al carrito',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
            });
        } catch (error) {
            console.error('Error al añadir el producto al carrito:', error);
            Swal.fire({
                position: 'bottom-end',
                icon: 'error',
                text: 'El producto ya se encuentra en el carrito con ese Talle.',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
            });
        }
    };


    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <Spinner />;
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
                    <div className='ruteCard'>
                        <NavDetail />
                        <span className='ruteCard'>Detalle del producto</span>
                    </div>

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
                                    <mark className='porcent'>{product?.offer}% OFF</mark>
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
                            {product?.sizes
                                .filter(sizeAndStock => sizeAndStock.stock !== 0)
                                .map((sizeAndStock, index) => (
                                    <span
                                        key={`sizeAndSotck${index}${sizeAndStock.size}`}
                                        className={selectedSize === sizeAndStock.size ? 'active' : ''}
                                        onClick={() => handleSizeClick(sizeAndStock.size)}
                                    >
                                        {sizeAndStock.size}
                                    </span>
                                ))}
                        </div>
                        <div className='boxStock'>
                            <span className='textStock'>Stock</span>
                            <span className='stockNumber'>{selectedStock !== null ? selectedStock : product?.stock}</span>
                        </div>
                        {product?.description && (
                            <div className='description'>
                                <h3>Descripción:</h3>
                                <p>{product?.description}</p>
                            </div>
                        )}
                    </div>
                    <div className='actions'>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <button className='btnConsult'>
                                <img src={Whatsapp} alt="iconWhatsapp" width={20} height={20} className='iconFill' />
                                Consultanos
                            </button>
                        </a>
                        <button className='btnAddToCart' onClick={handleAddToCart} >
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;
