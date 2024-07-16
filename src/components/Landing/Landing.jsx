import { Link } from "react-router-dom"
import CarrouselImage from "../sections/CarrouselImage"
import './Landing.css'
const Landing = () => {
  return (
    <main>
      <CarrouselImage />
      <div className="bannerSection">
        <Link to={'/products'}>
          <img src="/bannerProduct.png" alt="bannerProduct" className="imageBanner" />
        </Link>
        
      </div>
    </main>
  )
}

export default Landing