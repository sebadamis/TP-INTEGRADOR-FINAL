import "./home.css"
import "../../index.css"
import ProductGallery from "../../components/product-gallery/ProductGallery";
import ServiceFeatures from "../../components/service-features/ServiceFeatures";

export default function Home() {
  return (
  <>
      <div className="carousel-container">
        <div
          id="carouselSeba"
          className="carousel slide main-carousel"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://i.ibb.co/jgKvs0X/1.jpg"
                className="d-block w-100"
                alt="foto-1"
              />
            </div>
            <div className="carousel-item" data-bs-interval={3000}>
              <img
                src="https://i.ibb.co/RQsQFGy/9.jpg"
                className="d-block w-100"
                alt="foto-2"
              />
            </div>
            <div className="carousel-item" data-bs-interval={3000}>
              <img
                src="https://i.ibb.co/6s5N9g0/7.jpg"
                className="d-block w-100"
                alt="foto-3"
              />
            </div>
            <div className="carousel-item" data-bs-interval={3000}>
              <img
                src="https://i.ibb.co/856ZRbD/4.jpg"
                className="d-block w-100"
                alt="foto-4"
              />
            </div>
            <div className="carousel-item" data-bs-interval={3000}>
              <img
                src="https://i.ibb.co/wJTVRC2/5.jpg"
                className="d-block w-100"
                alt="foto-5"
              />
            </div>
          </div>
        </div>
      </div>

      <ProductGallery />

      <ServiceFeatures/>

      
  </>
  )
}
