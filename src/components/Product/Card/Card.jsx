import { Link } from 'react-router-dom';
import './Card.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectProduct } from '../../../redux/productsSlice';

const Card = (data) => {
    const [hovered, setHovered] = useState(false);
    const dispatch = useDispatch();

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    const handleClick = () => {
        dispatch(selectProduct(data));
    };

    const handlePrice = (price, offer) => {
        let newPrice = price - (offer * price) / 100;
        newPrice = Math.round(newPrice);
        return newPrice;
    };

    const hasOffer = data.data.offer > 0;
    const originalPrice = data.data.price;
    const discountedPrice = hasOffer ? handlePrice(originalPrice, data.data.offer) : null;

    return (
        <Link to={`/product/${data.data._id}`} className='cardLink boxCard' onClick={handleClick}>
            <img
                className='cardImage'
                src={hovered ? data.data.imageOne : data.data.image}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                alt="Product"
            />
            <p className='cardName'>{data.data.name}</p>
            <div className='priceContainer'>
                {hasOffer && (
                    <span className='originalPrice'>${originalPrice}</span>
                )}
                <span className='cardPrice'>{hasOffer ? `$${discountedPrice}` : `$${originalPrice}`}</span>
            </div>
        </Link>
    );
};

export default Card;
