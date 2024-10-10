import React, { useEffect, useState } from 'react'
import Logo from "../Assets/dashboards.png";
import {
       faMagnifyingGlass,
       faCartShopping,
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useQueryHooks from '../Api/useQueryHook';
import { environtment } from '../Environment/environment';
import secureLocalStorage from 'react-secure-storage';



  const Search = ({goToCart,Dispatch}) => {




    let authenticatedUser;
    let session;

    

   if(JSON.parse(secureLocalStorage.getItem("authenticate"))) {
      authenticatedUser = authenticatedUser = JSON.parse(secureLocalStorage.getItem("authenticate"))
      session = authenticatedUser.session      
   }


    
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
    } = useQueryHooks(environtment.api + "cart/" + "all-cart/" + (session ? session.id : null));

    



     const navigate = useNavigate()
     const goCart = () => {
       goToCart(false)
       navigate('/')
    }



  return (
    <>
       <div id="landing-page-search">
          <figure id="landing-page-logo-contain">
            <img src={Logo} id="landing-page-logo" />
          </figure>
          <div id="landing-page-search-text-contain">
            <div id="landing-page-search-contain">
              <input
                type="text"
                id="page-search"
                placeholder="search in e-commerce"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="landing-page-icons"
              />
            </div>
            <nav id="landing-page-navigation">
              <ul id="landing-page-navigation-search-list">
                <li className="page-search-navigation"> 1 peso sale </li>
                <li className="page-search-navigation"> Sale Cellphone </li>
                <li className="page-search-navigation">
                  {" "}
                  50% beauty products{" "}
                </li>
                <li className="page-search-navigation"> Men's Apparel </li>
                <li className="page-search-navigation"> Babies & Kids </li>
                <li className="page-search-navigation">
                  {" "}
                  Limited Edition Nike{" "}
                </li>
              </ul>
            </nav>
          </div>
          <div id="landing-page-shop" >
            <Link to="Shop" className="page-navigation" onClick={goCart}>
              <Badge badgeContent={data?.length ? data?.length: 0 } color="primary" >
                <FontAwesomeIcon icon={faCartShopping} id="page-shop" />
              </Badge>
            </Link>
          </div>
        </div>
    </>
  )
}

export default Search