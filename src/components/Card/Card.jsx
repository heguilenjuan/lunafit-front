/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './Card.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectProduct } from '../../redux/productsSlice';

const Card = ({ data }) => {
    const [hovered, setHovered] = useState(false);
    const dispatch = useDispatch();

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    // Verificar si el producto tiene stock en algún talle
    const isOutOfStock = data.sizes.every(size => size.stock === 0);

    const handleClick = (e) => {
        if (isOutOfStock) {
            e.preventDefault(); // Prevenir la navegación si está agotado
        } else {
            dispatch(selectProduct(data));
        }
    };

    const handlePrice = (price, offer) => {
        let newPrice = price - (offer * price) / 100;
        newPrice = Math.round(newPrice);
        return newPrice;
    };

    const calculateDiscountPercentage = (price, discountedPrice) => {
        return Math.round(((price - discountedPrice) / price) * 100);
    };

    const hasOffer = data.offer > 0;
    const originalPrice = data.price;
    const discountedPrice = hasOffer ? handlePrice(originalPrice, data.offer) : null;
    const discountPercentage = discountedPrice ? calculateDiscountPercentage(originalPrice, discountedPrice) : null;

    return (
        <div className={`cardContainer boxCard ${isOutOfStock ? 'out-of-stock' : ''}`}>
            <Link 
                to={isOutOfStock ? '#' : `/product/${data._id}`} 
                className='cardLink' 
                onClick={handleClick}
                style={{ pointerEvents: isOutOfStock ? 'none' : 'auto' }}
            >
                <img
                    className='cardImage'
                    src={hovered ? data.imageOne : data.image}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    alt="Product"
                />
                <p className='cardName'>{data.name}</p>
                <div className='priceContainer'>
                    {hasOffer && (
                        <>
                            <div>
                                <span className='originalPrice'>${originalPrice}</span>
                                <span className='discountPercentage'>-{discountPercentage}% OFF</span>
                            </div>
                            <span className='cardPrice'>${discountedPrice}</span>
                        </>
                    )}
                    {!hasOffer && (
                        <span className='cardPrice'>${originalPrice}</span>
                    )}
                </div>
            </Link>
            {isOutOfStock && (
                <div className='out-of-stock-overlay'>
                    <span>Sin Stock</span>
                </div>
            )}
        </div>
    );
};

export default Card;
