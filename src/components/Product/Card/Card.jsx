import { Link } from 'react-router-dom';
import './Card.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectProduct } from '../../../redux/productsSlice';

const Card = (data ) => {
    const [hovered, setHovered] = useState(false);
    const dispatch = useDispatch();

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    const handleClick = () => {
        dispatch(selectProduct(data));
    };

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
            <span className='cardPrice'>${data.data.price}</span>
        </Link>
    );
};

export default Card;
