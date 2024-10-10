import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {
    faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrderStatus = ({productId}) => {
  const steps = ["pending", "processed", "shipped", "delivered"];
  const {showStatus, setShowStatus} = productId
  const goToLanding = () => {
      setShowStatus({
        status : false,
        product : ''
      })
  };



 



  return (
    <>

    <div className="product-escape">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="product-detail-back"
          onClick={goToLanding}
        />
      </div>
      <div className="shop-container" style={{flexDirection:'column',  justifyContent:'flex-start',alignItems:'center'}}>

        <div
          id="order-status-details"
          style={{
            background: "rgb(233, 235, 238)",
            display: "flex",
            flexDirection: "column",
            rowGap: "1em",
            marginTop:"2.5em"
            
          }}
        >
          <div
            className="order-address-detail"
            style={{ padding: "1.5em", background: "#fff",paddingTop:'2em' }}
          >
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={steps.indexOf(showStatus.product.status)} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel className="order-status-label">{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
        </div>

        <div id="order-personal-address"
              style={{
                background: "#e9ebee",
                display: "flex",
                flexDirection: "column",
                rowGap: "1em",
                
              }}
            >

                <div
                  className="order-address-detail"
                  style={{ padding: "1.5em", background: "#fff" }}
                >
                  <div id="order-item-image">
                    <img className="product-image" src={showStatus.product.image_url} />
                  </div>
      
                  <div
                    className="order-item-description"
                    style={{ columnGap: "1.5em" }}
                  >
                    <div className="order-item-information">
                      <p className="order-item-paragraph">
                        <span>{showStatus.product.name}</span>
                      </p>
                      <p className="order-item-paragraph">Size</p>
                    </div>
      
                    <div className="order-item-information">
                      <p
                        className="order-item-paragraph "
                        style={{ maxWidth: "20em" }}
                      >
                        Billing address : {showStatus.product.billing_address}
                      </p>
                    </div>
      
                    <div className="order-item-information">
                      <p className="order-item-paragraph order-original">
                        {" "}
                        &#8369; {showStatus.product.sale_price}
                      </p>
                      <p className="order-item-paragraph order-dicounted">
                        {" "}
                        &#8369; {showStatus.product.price}
                      </p>
                      <p className="order-item-paragraph">
                        {" "}
                        {Math.round((showStatus.product.sale_price / showStatus.product.price) * 100)} % off
                      </p>
                    </div>
      
                    <div className="order-item-information">
                      <p className="order-item-paragraph">
                        Quantity : {showStatus.product.quantity}
                      </p>
                      <p className="order-item-paragraph">
                        Total Amount : {showStatus.product.total_amount}
                      </p>
                    </div>
                  </div>

                  <div
                  className="order-address-detail"
                  style={{ padding: "1.5em", background: "#fff" }}
                >
                </div>
                </div>

                
            </div>
      </div>
 
    </>
  );
};

export default OrderStatus;
