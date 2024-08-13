//React carousel
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";

//Style
import './CarrouselImage.scss';

//images
import Carrousel1 from '../../assets/images/carrousel1.png';
import Carrousel2 from '../../assets/images/carrousel2.png';
import Carrousel3 from '../../assets/images/carrousel3.png';

const CarrouselImage = () => {
    const img = [Carrousel1, Carrousel2, Carrousel3]
    return (
        <div className="section-carrousel">
            <Carousel className="crsl" autoPlay infiniteLoop centerMode interval={3000} showStatus={false} showArrows={false} >
                {img.map((image, index) => {
                    return (<img src={image} key={index} />)
                })}
            </Carousel>
        </div>
    )
}

export default CarrouselImage