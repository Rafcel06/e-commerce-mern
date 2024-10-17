import React, { useEffect, useRef, useState } from "react";

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../AuthGuard/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../E-Component/Footer";
import Search from "../E-Component/Search";
import { routeConfig } from "../Routing/routeConfig";
import { Link, useOutletContext } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useNavigate, Outlet } from "react-router-dom";
import Productdetails from "./Productdetails";

const Home = () => {
  const { user, login, logout } = useAuth();
  const [productDetails ,setProductDetails] = useState(false)
  const [productId,setProductId] = useState()
  const [mobileUI,setMobileUI] = useState(false)
  const navigate = useNavigate();


 
  const goToLogin = () => {
    secureLocalStorage.clear();
    logout();
    navigate("/home");
  };



  const goToProduct = (product) => {
    setProductDetails(true)
    setProductId(product)
    if(window.screen.availWidth <= 720) {
       setMobileUI(true)
       return
    }
}

const closeFlow = () => {
   setProductDetails(false)
   setProductId('')
}
 

  return (
    <>
      <div id="landing-page-container">
        <nav id="landing-page-navigation">
          <ul id="landing-page-navigation-list">
            {routeConfig[3].children?.map((route, index) =>
              !route.parentnavigation ? (
                !route?.subnavigation ? (
                  <Link
                    key={index}
                    to={route?.path}
                    className="page-navigation"
                    onClick={closeFlow}
                   
                  >
                    <FontAwesomeIcon
                      icon={route?.icons}
                      className="navigation-icons"
                    />
                    {route?.path || "featured"}
                  </Link>
                ) : null
              ) : (
                <div key={index}>
                  <Link to={route.path} className="page-navigation"  onClick={closeFlow} >
                    <FontAwesomeIcon
                      icon={route?.icons}
                      className="navigation-icons"
                  
                    />
                    {route?.path}
                  </Link>
                </div>
              )
            )}

            <div className="page-navigation" onClick={goToLogin}>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="navigation-icons"
              />
              Log out
            </div>
          </ul>
        </nav>
        {  mobileUI  ? null : <Search goToCart={setProductDetails} setMobileUI={setMobileUI} mobileUI={mobileUI}/>} 
        {  productDetails ?  <Productdetails productId={productId}  productDetails={productDetails} setProductDetails={setProductDetails} setMobileUI={setMobileUI} /> :  <Outlet context={{goToProduct:goToProduct,setProductDetails : setProductDetails,  setMobileUI:setMobileUI, productId: productId, productDetails:productDetails,mobileUI:mobileUI}}/> }
      </div>
      <Footer />
    </>
  );
};

export default Home;
