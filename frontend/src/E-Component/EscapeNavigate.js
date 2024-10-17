import React, {useState} from "react";
import {

  faArrowLeft,
  faCartShopping,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useMatches  } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { routeConfig } from "../Routing/routeConfig";
import { useNavigate } from "react-router-dom";


const EscapeNavigate = ({goToLanding,goToLogin, productDetails,goCart,closeFlow,OpenLogin,OpenRegister, goToDetail, order,setMobileUI,setHideBack, setProductDetails,setOrder,setMobileUIRoute,mobileUI,productId}) => {

    const authenticatedUser = JSON.parse(secureLocalStorage.getItem("authenticate"));
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);



    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    
    };
    const handleClose = () => {
      setAnchorEl(null);
    
    };


    const goBack = () => {

      alert("Back Called")
      
        if(!order) {
          goToLanding()
          return
        }

        else {
           if(order.checkOut) {
            setHideBack(false)
           }
            goToDetail()
            if(window.screen.availWidth <= 720) {
              setMobileUI(true)
              return
           }
        }     
    }

    const goToHome = () => {

      alert("Called !!!")
         
 
      if(productId && !authenticatedUser) {
           setProductDetails(false)
           setMobileUI(false)
          return
      }
          // End line 

      if(productId && authenticatedUser) {
            setProductDetails(false)
            setMobileUI(false)
           return
       }
      

      if (!authenticatedUser && !productDetails) {
          setMobileUIRoute(false)
          navigate(-1)
          return
      }


      if(!productDetails && !order) {
              navigate(-1)
              

              if(authenticatedUser) {
                setMobileUIRoute(false)
                return
              }

              return
       }

           setMobileUI(false)
           setProductDetails(false)
           return
    }

    const changeRoute = (route) => {
   

      if (!productDetails && !order) {
        setProductDetails(false);
        setMobileUI(true);
  
        alert("CALLED BOTH !!!")

    
        if (route === '') {
          setMobileUI(false)
          setProductDetails(false);
          
          return;
        }
        return;
      }
    
      if (order && productDetails) {
        setOrder({ order: false });
        closeFlow(route)
  
        // if (!route === '') {
        //   setMobileUI(true)
        //   return;
        // }

        return; 
      }
    };
    
   
  return (
    <div className="product-escape" >
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="product-detail-back"
        onClick={!order ? goToHome : goBack}
      />
      <div className="shop-and-navigation" style={order?.checkOut || mobileUI ? {display:"none"} : null}>
        <Link to="/home/shop" className="page-navigation" onClick={goCart}>
          <FontAwesomeIcon
            icon={faCartShopping}
            className="product-detail-back"
          />
        </Link>

        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="product-detail-back"
          />
        </Button>

        {authenticatedUser ? (
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {routeConfig[3].children?.map((route, index) =>
              !route.parentnavigation ? (
                !route?.subnavigation ? (
                  <Link
                    key={index}
                    to={"/home/" + route?.path}
                    className="page-navigation"
                    style={{ textTransform: "capitalize", marginLeft: "0.3em" }}
                    onClick={(event) => {
                      event.preventDefault(); 
                      changeRoute(route?.path); 
                      if (!order || productDetails) {
                        navigate("/home/" + route?.path); 
                      } else {
                        goToLanding(route?.path, setOrder, order); 
                      }
                    }}
                  >
                    {route?.path || "featured"}
                  </Link>
                ) : null
              ) : (
                <div key={index}>
                  <Link
                    to={"/home/" + route?.path}
                    className="page-navigation"
                    onClick={closeFlow}
                    style={{ textTransform: "capitalize", marginLeft: "0.3em" }}
                  >
                    {route?.path}
                  </Link>
                </div>
              )
            )}
            <MenuItem onClick={goToLogin}>Logout</MenuItem>
          </Menu>
        ) : (
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {routeConfig[0].children.map((mapped, index) =>
              mapped.parentnavigation ? (
                <Link
                  to={mapped.path}
                  className="page-navigation"
                  key={index}
                  style={{ textTransform: "capitalize", marginLeft: "0.3em" }}
                  onClick={() => closeFlow(mapped.path)}
                >
                  {mapped.path}
                </Link>
              ) : null
            )}
            <MenuItem onClick={OpenLogin}>Login</MenuItem>
            <MenuItem onClick={OpenRegister}>Signup</MenuItem>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default EscapeNavigate;
