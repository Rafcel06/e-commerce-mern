import React from "react";

const Addresslist = () => {
  return (
    <>
      <div className="order-detail-form" style={{ padding: "0" }}>
        <div id="order-set-address">
          <div className="order-address-shipping">
            <p className="order-address-information">Shipping Address</p>
            <p className="order-address-information"  style={{ cursor: "pointer" }} >Add Address</p>
          </div>

          <div id="order-personal-address">
            <div className="order-address-detail">
              <p className="order-address-information">Rafcel Teberio</p>
              <p className="order-address-information">09928389941</p>
            </div>
            <p className="order-address-information">
              Address Castillon homes{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addresslist;
