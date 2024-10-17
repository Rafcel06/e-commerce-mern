import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { environtment } from "../Environment/environment";
import useQueryHooks from "../Api/useQueryHook";
import Orderdetails from "./Orderdetails";
import { useNavigate, useOutletContext } from "react-router-dom";

import {
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const Shopcards = ({ cart }) => {
  const authenticatedUser = JSON.parse(
    secureLocalStorage.getItem("authenticate")
  );

  const context = useOutletContext()
  const { session } = authenticatedUser;
  const [count, setCount] = useState([]);
  const [selected,setSelected] = useState([])
  const [productId,setProductId] = useState({})
  const navigate = useNavigate()
  const [hideBack,setHideBack] = useState(false)

  const [order,setOrder] = useState({
    order:false,
    productId : {},
    quantity :''
  })
  const [currentIndex,setCurrentIndex] = useState()
  const [submitedForm,setSubmitedForm] = useState(false)

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
    getOrders,
  } = useQueryHooks(environtment.api + "cart/" + "all-cart/" + session.id, submitedForm);

  const {setProductDetails,setMobileUI} = context 

  useEffect(() => {
    if (data) {
      setCount(Array(data.length).fill(1)); 
      cart(data);
    }



  }, [data, cart,order]);

  const Increment = (index,event) => {
    event.stopPropagation();
    const newCount = [...count];
    newCount[index] += 1;
    setCount(newCount);


  };

  const Decrement = (index,event) => {
    event.stopPropagation();
    const newCount = [...count];
    if (newCount[index] > 1) {
      newCount[index] -= 1;
      setCount(newCount);
    }

  };


  const Selected = (index, mapped) => {
    const newSelected = [...selected];
  
    if (newSelected[index]) {
      newSelected[index] = false; 
      setProductId(null); 
    } else {
      newSelected.fill(false); 
      newSelected[index] = true; 
      if (mapped) {
        setProductId(mapped); 
      }
    }
  
    setSelected(newSelected);
    setCurrentIndex(newSelected[index] ? index : null); 
  };
  
  const CheckOut = () => {
    const selectedCount = count[currentIndex] || 0;
    setHideBack(true)
    if(window.screen.availWidth <= 720) {
      setMobileUI(true)
   }
    setOrder({ 
      order: true,
      checkOut : true,
      productId: productId,
      quantity: selectedCount,
    });
  };
  
  useEffect(() => {}, [order]);


  const RemoveCart = () => {
    deleteData(environtment.api + "cart/" + "delete-cart/" + productId.cart_id)
      .then((response) => {
        setSubmitedForm((prev) => !prev);
        window.location.reload()
        const updatedSelected = [...selected];
        updatedSelected[currentIndex] = false; 
        setSelected(updatedSelected);
        setProductId(null); 
        setCurrentIndex(null); 

      })
      .catch((err) => console.log(err));
  };


  const goToHome = () => {
     navigate("/home")
     setMobileUI(false)
  }
  
  


  return (
 <>  
 {
   hideBack ? 
      null
      :
     <div className="product-escape" >
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="product-detail-back"
        style={hideBack ? {display: "none"} : null}
        onClick={goToHome}
      />
      </div>}

   { order.order ? <Orderdetails setOrder={setOrder} order={order} setProductDetails={setProductDetails} setMobileUI={setMobileUI}  setHideBack={setHideBack}/>  : 
    <div
      id="order-personal-address"
      style={{
        background: "#e9ebee",
        display: "flex",
        flexDirection: "column",
        rowGap: "1em",
        paddingTop:"5em"
      }}
    >
      {data?.map((mapped, index) => (
        <div
          className={`order-address-detail ${selected[index] ? 'selected' : ''}`} 
          key={index}
          style={{ padding: "1.5em", background: "#fff" }}
          onClick={() => Selected(index,mapped)}
          data-card={selected[index] ? 'true' : 'false'}
        >

          <div id="order-item-image">
            <img className="product-image" src={mapped?.image_url} />
          </div>

          <div className="order-item-description" style={{ columnGap: "1.5em" }}>
            <div className="order-item-information">
              <p className="order-item-paragraph">
                <span>{mapped?.product_name}</span>
              </p>
              <p className="order-item-paragraph">Size</p>
            </div>

            <div className="order-item-information">
              <p className="order-item-paragraph order-original">
                &#8369; {mapped?.sale_price}
              </p>
              <p className="order-item-paragraph order-dicounted">
                &#8369; {mapped?.price}
              </p>
              <p className="order-item-paragraph">
                {Math.round((mapped?.sale_price / mapped?.price) * 100)} % off
              </p>
            </div>

            <div className="order-item-checkout" style={{padding:'5px 0'}}>
              <div
                className="product-detail-quantity"
                style={{ border: "none", margin: "0",marginBottom:'0.7em' }}
              >
                <p className="product-detail-number">Quantity:</p>
                <button className="add-deduct" onClick={(event) => Increment(index,event)}>+</button>
                <p className="product-detail-number" data-quantity={count[index]}>
                  {count[index]}
                </p>
                <button className="add-deduct" onClick={(event) => Decrement(index,event)}>-</button>
              </div>
              <p className="product-detail-number">Total: &#8369; {mapped?.sale_price * count[index]}</p>
            </div>
          </div>
        </div>



      ))}
        <div
          className="order-address-detail"
          style={selected.some(isSelected => isSelected) ? { padding: "1.5em", background: "#fff" } : { display: 'none' }}
          id="check-out-cart">
         <button className="product-action-btn"  onClick={RemoveCart}>Remove</button>
         <button className="product-action-btn"  onClick={CheckOut}>Check Out</button>
       </div>

      
    </div>
      }
    </>
  );
};

export default Shopcards;
