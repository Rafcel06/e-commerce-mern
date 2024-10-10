import React, { useEffect, useState } from "react";
import product1 from "../Assets/product-1.jpg";
import product2 from "../Assets/product-2.jpg";
import product3 from "../Assets/product-3.png";
import useQueryHooks from "../Api/useQueryHook"
import { useNavigate } from "react-router-dom";
import { environtment } from "../Environment/environment";
import useSnackbar from "../Api/useSnakbar"
import { useOutletContext } from "react-router-dom";

const Feartured = () => {

 const context = useOutletContext()
 const {goToProduct} = context
 const images = [product3, product2, product1];
 const [currentIndex, setCurrentIndex] = useState(0);
 const { SnackbarComponent, showSnackbar, setOpenSnackbar, openSnackbar } = useSnackbar();
 const {
  data,
  queryLoading,
  queryError,
  setError,
  createProfile,
  updateProfile,
  deleteProfile,
} = useQueryHooks(environtment.api + "product/" + "all-products", openSnackbar);



 const goToPrevious = () => {
   setCurrentIndex((prevIndex) =>
     prevIndex === 0 ? images.length - 1 : prevIndex - 1
   );
 };

 const goToNext = () => {
   setCurrentIndex((prevIndex) =>
     prevIndex === images.length - 1 ? 0 : prevIndex + 1
   );
 };

 const goToSlide = (index) => {
   setCurrentIndex(index);
 };

 const productDetails = (product) => {
    goToProduct(product) 
 }


  return (
    <>
      <div id="landing-page-container">
        <div id="landing-page-carousel">
          <div id="landing-page-carousel-contain">
            <div className="landing-page-carousel-image" id="page-carousel">
              <div className="carousel">
                <button className="carousel-button left" onClick={goToPrevious}>
                  &#10094;
                </button>
                <div className="carousel-image">
                  <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                  />
                </div>
                <button className="carousel-button right" onClick={goToNext}>
                  &#10095;
                </button>
                <div className="carousel-dots">
                  {images.map((_, index) => (
                    <span
                      key={index}
                      className={`carousel-dot ${
                        index === currentIndex ? "active" : ""
                      }`}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="landing-page-carousel-image" id="page-images">
              <div className="page-image-contain">
                <img className="landing-page-stayed-image" src={product1} />
              </div>
              <div className="page-image-contain">
                <img className="landing-page-stayed-image" src={product2} />
              </div>
            </div>
          </div>
        </div>

        <div className="landing-page-featured">
          <h1>Flash Sale</h1>
           <div className="landing-page-featured-card">
             <div className="featured-card-header">
                 <div className="featured-text-contain">
                   <p className="featured-text">On Sale Now</p>
                   {/* <div  className="featured-text" id="featured-count">
                      <p className="featured-text-count">Ending in</p>
                      <p className="featured-text-count">00</p> :
                      <p className="featured-text-count">00</p> : 
                      <p className="featured-text-count">00</p>
                   </div> */}
                 </div>
                 <button className="featured-text-contain">
                    SHOP ALL PRODUCTS
                 </button>
             </div>
          </div>
          <div className="featured-product-contain">

               {
                data?.map((mapped,index) => (
       
                   <div className="featured-product-cards" key={index} onClick={() => productDetails(mapped)}>
                       <img className="featured-product-image" src={mapped?.image_url}/>
                       <p className="featured-product-name">{mapped?.name}</p>
                       <p className="featured-product-price">&#8369; {mapped?.price}</p>
                       <p className="featured-product-discount"><span className="featured-product-original">&#8369; {mapped?.sale_price}</span> - {Math.round(mapped?.sale_price / mapped?.price * 100)} % off</p>
                   </div>
              
                ))
               }
          </div>
        </div>

        <div className="landing-page-featured">
          <h1>Category</h1>
          <div className="featured-product-contain">

               {
                data?.map((mapped,index) => (
                   <div className="featured-product-cards" key={index} onClick={() => productDetails(mapped)}>
                       <img className="featured-product-image" src={mapped?.image_url}/>
                       <p className="featured-product-name">{mapped?.name}</p>
                       <p className="featured-product-price">&#8369; {mapped?.price}</p>
                       <p className="featured-product-discount"><span className="featured-product-original">&#8369; {mapped?.sale_price}</span> - {Math.round(mapped?.sale_price / mapped?.price * 100)} % off</p>
                   </div>
                ))
               }
          </div>     
        </div>

        <div className="landing-page-featured">
          <h1>For you</h1>
          <div className="featured-product-contain">

                {

                data?.map((mapped,index) => (
                   <div className="featured-product-cards" key={index} onClick={() => productDetails(mapped)}>
                       <img className="featured-product-image" src={mapped?.image_url}/>
                       <p className="featured-product-name">{mapped?.name}</p>
                       <p className="featured-product-price">&#8369; {mapped?.price}</p>
                       <p className="featured-product-discount"><span className="featured-product-original">&#8369; {mapped?.sale_price}</span> - {Math.round(mapped?.sale_price / mapped?.price * 100)} % off</p>
                   </div>
                ))
               }
          </div>
        </div>
      </div>
    </>
  );
};

export default Feartured;
