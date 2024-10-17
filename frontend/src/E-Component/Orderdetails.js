import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  faStar,
  faMagnifyingGlass,
  faArrowLeft,
  faCartShopping,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useQueryHooks from "../Api/useQueryHook";
import { environtment } from "../Environment/environment";
import { useForm } from "react-hook-form";
import secureLocalStorage from "react-secure-storage";
import AddressForm from "./AddressForm";
import useModal from "../Api/useModal";

import useDialog from "../Api/useDialog";
import { NO_ADDRESS, NO_ADDRESS_FOUND } from "../Utils/constant";
import { useNavigate,Link } from "react-router-dom";
import { routeConfig } from "../Routing/routeConfig";
import { useAuth } from "../AuthGuard/Auth";
import EscapeNavigate from "./EscapeNavigate";


const Initialize = {
  newAddress: true,
  chooseAddress: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NEW_ADDRESS":
      return {
        newAddress: true,
        chooseAddress: false,
      };
    case "CHOOSE_ADDRESS": {
      return {
        newAddress: false,
        chooseAddress: true,
      };
    }
    default:
      return state;
  }
};

const Orderdetails = ({setOrder, order, productDetails, setProductDetails,setMobileUI,goToLanding}) => {

  const [addressOn, setAddressOn] = useState();
  const { user, login, logout } = useAuth();
  const [activeAddress, setActiveAddress] = useState(false);
  const [userAddress, setUserAddress] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [orderAddress, setOrderAddress] = useState();
  const [myOrder, setMyOrder] = useState();
  const { Modal, openModal, closeModal, isOpen } = useModal();
  const [formState, dispatch] = useReducer(reducer, Initialize);
  const navigate = useNavigate()
  const { openDialog, DialogComponent } = useDialog();
  const [submitedForm, setSubmitedForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("cash_on");
  

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const {
    data,
    queryLoading,
    queryError,
    setError,
    createData,
    updateData,
    deleteData,
    getRegion,
    getProvince,
    getCity,
    getBarangay,
    getAddress,
  } = useQueryHooks(environtment.api, submitedForm)

 

  const authenticatedUser = JSON.parse(secureLocalStorage.getItem("authenticate"));
  const { session } = authenticatedUser;
  const form_placeOrder = useForm();
  const {
    handleSubmit: handleSubmit_placeOrder,
    register: register_placeOrder,
    formState: formState_placeOrder,
  } = form_placeOrder;


 

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };


  useEffect(() => {
    getAddress(environtment.api + "address/" + "all-address/" + session.id)
      .then((response) => {
        setAddressOn(response.data);
        setUserAddress(response.data.length > 0);
        setOrderAddress(addressOn.filter((filtered) => filtered.active === 1));
      })
      .catch((err) => console.log(err));
  }, [submitedForm, userAddress, activeAddress]);

  const setAddress = (data) => {
    createData(environtment.api + "address/" + "create-address", data)
      .then((response) => {
        setSubmitedForm((prev) => !prev);
        closeModal()
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const placeOrder = (data) => {
  
    if(orderAddress.length === 0) {
      handleOpenDialog()
      return
    }

    if(orderAddress.length > 0) {

    const newOrder = {
      ...data,
      user_id :`${orderAddress[0].user_id}`,
      total_amount: order.productId.sale_price * order.quantity + 40,
      quantity: order.quantity,
      shipping_address: `${orderAddress[0].city} ${orderAddress[0].barangay} ${orderAddress[0].address}`,
      billing_address: `${orderAddress[0].city} ${orderAddress[0].barangay} ${orderAddress[0].address}`,
      product_id : order.productId.id || order.productId.product_id
    };
  
    setMyOrder(newOrder); 

  createData(environtment.api + "order/" + "create-order", newOrder)
   .then((response) => {
    setSubmitedForm((prev) => !prev);

    const product_update = order.productId.id ? order.productId.id : order.productId.product_id

    updateData(environtment.api + "product/" + "update-product/" + product_update ,{stock_quantity: order.quantity})
    .then((res) => { 
       setOrder({ order: false });
       setProductDetails(false)
       if(order?.productId?.cart_id) {
         deleteData(environtment.api + "cart/" + "delete-cart/" + order.productId.cart_id)
          .then((response) =>  {
            window.location.reload()
            setSubmitedForm(true)
            navigate('/home')
           })
          .catch((err) => console.log(response))
       }

   })
    .catch((err) => console.log(err))
   })
   .catch((err) => {
    console.log(err)
   })
  }


  };
  
  const goToDetail = () => {
    setOrder({ order: false });
  };

  const editAddress = () => {
    openModal();
  };

  const changeStatus = (data) => {
    const newActiveStatus = !data.active;
    setAddressOn((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === data.id
          ? { ...address, active: newActiveStatus }
          : address
      )
    );

    updateData(environtment.api + "address/" + "update-address/" + data.id, {
      active: newActiveStatus,
    })
      .then((response) => {
        console.log("Update successfully");
        setSubmitedForm((prev) => !prev);
      })
      .catch((err) => {
        console.error("Update failed", err);
        setAddressOn((prevAddresses) =>
          prevAddresses.map((address) =>
            address.id === data.id
              ? { ...address, active: !newActiveStatus }
              : address
          )
        );
      });
  };

  const showOther = () => {
    setShowMore((prevState) => (prevState = !prevState));
  };


  const handleOpenDialog = (data) => {
    
    const dialogTitle = NO_ADDRESS_FOUND;
    const dialogMessage = NO_ADDRESS;
    const confirmCallback = () => {
      console.log('Dialog Confirmed !')
    };

    const closeCallback = () => {
      console.log('Dialog closed!');
    };

    openDialog(dialogTitle, dialogMessage, confirmCallback, closeCallback);

  };

  
  const goCart = () => {
    setProductDetails(false)
    navigate('/')

 }



  const closeFlow = (route) => {

    if(!route == "") {
      setProductDetails(false)
      setMobileUI(true)
  
      return
    }

     setProductDetails(false)
     setMobileUI(false)

 }


 const goToLogin = () => {
  secureLocalStorage.clear();
  logout();
  navigate("/home");
};



  return (
    <>
      {/* <div className="product-escape">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="product-detail-back"
          onClick={goToDetail}
          
        />
            <div className="shop-and-navigation">
           <Link to="Shop" className="page-navigation" 
           onClick={goCart}
           >
            
             <FontAwesomeIcon
               icon={faCartShopping}
               className="product-detail-back"
            />
            </Link>


            <Button
              id="basic-button"

              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick} >
              <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="product-detail-back"
            />
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
           >
              {routeConfig[3].children?.map((route, index) =>
              !route.parentnavigation ? (
                !route?.subnavigation ? (
                  <Link
                    key={index}
                    to={route?.path}
                    className="page-navigation"
                    style={{textTransform:'capitalize',marginLeft:'0.3em'}}
                    onClick={closeFlow}
                  >

                    {route?.path || "featured"}
                  </Link>
                ) : null
              ) : (
                <div key={index}>
                  <Link to={route.path} className="page-navigation" onClick={closeFlow} 
                    style={{textTransform:'capitalize',marginLeft:'0.3em'}}>  
                    {route?.path}
                  </Link>
                </div>
              )
            )}
             <MenuItem onClick={goToLogin}>Logout</MenuItem>
           </Menu>

            </div>
      </div> */}

   <EscapeNavigate goToLanding={goToLanding} productDetails={productDetails} goToDetail={goToDetail} goCart={goCart} goToLogin={goToLogin} closeFlow={closeFlow} order={order} setOrder={setOrder} setMobileUI={setMobileUI} /> 
      <div id="order-detail-container">

        <div className="order-detail-contain" >

          {userAddress ? (
            <div className="order-detail-form" style={userAddress ? { padding: "0", flexDirection:'column', rowGap:'1em', background:'transparent'} : {padding: 0} } >
              <div id="order-set-address" >
                <div className="order-address-shipping">
                  <p className="order-address-information">Shipping Address</p>
                  <p
                    className="order-address-information"
                    onClick={editAddress}
                    style={{ cursor: "pointer" }}
                  >
                    Add address
                  </p>
                </div>
                {addressOn?.map((mapped, index) => (
                  <div
                    id="order-personal-address"
                    key={index}
                    className={mapped?.active || showMore ? "" : "show_less"}                    
                    style={{
                      boxShadow:'0 4px 20px rgba(0, 0, 0, 0.2)'
                   }}
                  >
                    <div className="order-address-detail">
                      <p className="order-address-information">
                        {mapped?.fullName}
                      </p>
                      <p className="order-address-information">
                        {mapped?.phone}
                      </p>
                    </div>
                    <div className="order-address-information active_address">
                      <p
                        className="order-address-active"
                        onClick={() => changeStatus(mapped)}
                        style={
                          mapped?.active
                            ? { background: "#1877f2" }
                            : { background: "red" }
                        }
                      >
                        {mapped?.active ? "Active" : "Inactive"}
                      </p>
                      {mapped?.city + " "} {mapped?.barangay + " "}{" "}
                      {mapped?.address}
                    </div>
                  </div>
                ))}
                <div className="order-address-shipping">
                  <p
                    className="order-address-information"
                    style={{ cursor: "pointer" }}
                    onClick={showOther}
                  >
                    Show Other
                  </p>
                </div>
              </div>

              <div id="order-set-address" >
                 <div className="order-address-shipping">
                     <p className="order-address-information">Package 1 of 1</p>
                        <p className="order-address-information" onClick={editAddress} style={{ cursor: "pointer" }}  >
                          Shipped by sample
                  </p>
                </div>

                <div id="order-personal-address" >
                    <div className="order-address-detail" >
                       <div id="order-item-image">
                         <img className="product-image" src={order?.productId?.image_url}/> 
                       </div>

                        <div className="order-item-description" >
                            <div className="order-item-information">
                                <p className="order-item-paragraph">{order?.productId.name ? order?.productId.name : order?.productId?.product_name}</p>
                                <p className="order-item-paragraph">Size</p>

                            </div>

                            <div className="order-item-information">
                                <p className="order-item-paragraph order-original"> &#8369;{order?.productId?.sale_price}</p>
                                <p className="order-item-paragraph order-dicounted"> &#8369;{order?.productId?.price}</p>
                                <p className="order-item-paragraph"> {Math.round(order?.productId?.sale_price / order?.productId?.price * 100)} % off</p>
                            </div>


                            <div className="order-item-information">
                                <p className="order-item-paragraph">Quantity : {order?.quantity}</p>
                            </div>
                        </div>

                        
                    </div>
                  </div>
              </div>
            </div>

 
            

              


          ) : (
            <AddressForm setAddress={setAddress} order={order} />
          )}

          
      
          
          <div id="order-detail-payment">
            <div className="form-group form-extend">
              <form onSubmit={handleSubmit_placeOrder(placeOrder)}>
                <p className="order-payment-header">Select payment method</p>

                <div className="order-payment-card">
                  <label className="order-payment-list-method">
                    <div className="order-detail-fill">
                      <input
                        type="radio"
                        name="payment"
                        value="cash_on"
                        className="order-detail-check"
                        checked={selectedPayment === "cash_on"}
                        {...register_placeOrder("payment_method", {
                          required: {
                            value: true, // Ensure at least one option is selected
                          },
                          onChange: handlePaymentChange,
                        })}
                      />
                      <span className="custom-checkbox"></span>
                      Cash On Delivery
                    </div>
                    <p className="order-detail-text">Pay when you receive</p>
                  </label>
                </div>

                <div className="order-payment-card">
                  <label className="order-payment-list-method">
                    <div className="order-detail-fill">
                      <input
                        type="radio"
                        name="payment"
                        value="G_cash"
                        className="order-detail-check"
                        checked={selectedPayment === "G_cash"}
                        {...register_placeOrder("payment_method", {
                          required: {
                            value: true, // Ensure at least one option is selected
                          },
                          onChange: handlePaymentChange,
                        })}
                      />
                      <span className="custom-checkbox"></span>
                      Gcash e-Wallet
                    </div>
                    <p className="order-detail-text">Gcash e-Wallet</p>
                  </label>
                </div>

                <div className="order-payment-total">
                  <div className="form-group">
                    <label htmlFor="voucher">Voucher:</label>
                    <div className="order-payment-voucher">
                      <input
                        required=""
                        placeholder="Enter your Voucher Code"
                        name="voucher"
                        className="form-search"
                        type="text"
                        {...register_placeOrder("voucher", {
                          required: {
                            value: false,
                          },
                        })}
                      />
                      <div className="order-voucher-search-contain">
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          className="order-voucher-search"
                        />
                      </div>
                    </div>
                  </div>

                  <p className="order-payment-header">Order Summary</p>

                  <div className="order-detail-list">
                    <p className="order-items">
                      Subtotal ({order.quantity} Item)
                    </p>
                    <p className="order-items">
                      &#8369; {order.productId.sale_price * order.quantity}
                    </p>
                  </div>

                  <div className="order-detail-list" id="order-shipping-fee">
                    <p className="order-items">Shipping Fee</p>
                    <p className="order-items">&#8369; 40</p>
                  </div>

                  <div className="order-detail-list">
                    <p className="order-items">Total:</p>
                    <p className="order-items">
                      &#8369; {order.productId.sale_price * order.quantity + 40}
                    </p>
                  </div>

                  <input
                    type="submit"
                    id="place-order"
                    value="PLACE ORDER NOW"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal content={<AddressForm setAddress={setAddress} order={order} />} />
      <DialogComponent />
    </>
  );
};

export default Orderdetails;
