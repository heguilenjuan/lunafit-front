import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import './CarrouselImage.css';

const CarrouselImage = () => {
    const img = ['/carrousel1.png', '/carrousel2.png', '/carrousel3.png']
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