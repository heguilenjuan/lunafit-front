import { Link } from 'react-router-dom';
import './Card.css';
import { useState } from 'react';

const Card = (data) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    return (
        <Link to={`/product/${data.data._id}`} className='cardLink boxCard'>

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
