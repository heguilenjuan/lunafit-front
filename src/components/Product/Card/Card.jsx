import { Link } from 'react-router-dom';
import './Card.css';
import { useState } from 'react';

const Card = (data ) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    return (
        <Link to={`/product/${data.data._id}`} className='cardLink'>
            <div className='boxCard'>
                <img
                    className='cardImage'
                    src={hovered ? data.data.image : data.data.imageOne}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    alt="Product"
                />
                <p className='cardName'>{data.data.name}</p>
                <span className='cardPrice'>${data.data.price}</span>
            </div>
        </Link>
    );
};

export default Card;
