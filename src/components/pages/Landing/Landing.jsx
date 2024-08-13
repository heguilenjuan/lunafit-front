import { Link } from "react-router-dom"
import CarrouselImage from "../../Carrousel/CarrouselImage"

import './Landing.scss'

import BannerProduct from '../../../assets/images/bannerProduct.png'
const Landing = () => {
  return (
    <main>
      <CarrouselImage />
      <div className="bannerSection">
        <Link to={'/products'}>
          <img src={BannerProduct} alt="bannerProduct" className="imageBanner" />
        </Link>
      </div>
    </main>
  )
}

export default Landing