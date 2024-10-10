import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import Shopcards from "./Shopcards";
import { environtment } from "../Environment/environment";
import useQueryHooks from '../Api/useQueryHook'

const Shop = () => {
  const context = useOutletContext();
  const navigate = useNavigate();
  const [orderList,setOrderList] = useState()
  const authenticatedUser = JSON.parse(secureLocalStorage.getItem("authenticate"));
  const { Dispatch } = context;



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
  } = useQueryHooks(environtment.api + "cart/" + "all-cart/" + authenticatedUser?.session?.id || 0);
  

  const openForm = () => {
    if (authenticatedUser != null) {
      navigate("/Home");
      return;
    }

    Dispatch({ type: "LOGIN" });
  };

  const shop_cart = (data) => {
      return data
  }

  useEffect(() => {
    if(authenticatedUser) {
      setOrderList(shop_cart())
    }
  }, [])

  return (
    <>
      <div className="shop-container">
        {!authenticatedUser || !data?.length ? (<div className={!authenticatedUser || !data?.length    ? "shop-list-card " + "absolute_height" : "shop-list-card"} >
            <h3>No Item Added yet</h3>
            <button className="shop-button" onClick={openForm}>
              Continue Shop
            </button>
          </div>) : <Shopcards cart={shop_cart}/>}
      </div>
    </>
  );
};

export default Shop;
