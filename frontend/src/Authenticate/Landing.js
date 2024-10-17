import React, { useState, useEffect, useReducer } from "react";
import {
  faBell,
  faCircleQuestion,
  faRightToBracket,
  faUserPlus,
  faEye,
  faEyeSlash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../AuthGuard/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useRef } from "react";

import useModal from "../Api/useModal";
import useBackdrop from "../Api/useBackdrop";
import useQueryHooks from "../Api/useQueryHook";
import useSnackbar from "../Api/useSnakbar";
import {
  CREATE_FAILED,
  CREATE_SUCCESSFULLY,
  SUCCESS,
  ERROR,
  SEND_EMAIL_SUCCESFULLY,
  SEND_EMAIL_FAILED,
  LOGIN_SUCCESFULLY,
  LOGIN_FAILED,
  NOT_VERIFIED,
} from "../Utils/constant";

import axios from "axios";
import { Link, Outlet, useNavigate} from "react-router-dom";
import { environtment } from "../Environment/environment";
import secureLocalStorage from "react-secure-storage";
import Login from "./Login";
import Forgot from "./Forgot";
import Register from "./Register";
import Footer from "../E-Component/Footer";
import Search from "../E-Component/Search";
import Productdetails from "../E-Component/Productdetails";
import { routeConfig } from "../Routing/routeConfig";


 const authInit = {
  login: true,
  register: false,
  forgot: false,
};

 const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        login: true,
        register: false,
        forgot: false,
      };
    case "REGISTER":
      return {
        login: false,
        register: true,
        forgot: false,
      };

    case "FORGOT":
      return {
        login: false,
        register: false,
        forgot: true,
      };
    default:
      return state;
  }
};

const Landing = () => {
  const navigate = useNavigate();
  const { BackdropComponent, showBackdrop, hideBackdrop } = useBackdrop();
  const ref = useRef();
  const [authState, dispatch] = useReducer(reducer, authInit);
  const { SnackbarComponent, showSnackbar, setOpenSnackbar, openSnackbar } = useSnackbar();
  const authenticatedUser = secureLocalStorage.getItem('authenticate')



  const {
    data,
    queryLoading,
    queryError,
    setError,
    createData,
    updateData,
    deleteData,
  } = useQueryHooks(environtment.api + "product/" + "all-products", openSnackbar);

  useEffect(() => {
    if(authenticatedUser) {
       navigate('/home')
       return
    }
    if(!authenticatedUser) {
       navigate('/')
    }
  },[])

 

  // const [timeLeft, setTimeLeft] = useState(24 * 60 * 60 * 1000);

  // useEffect(() => {
  //   // Update the timer every second
  //   const timer = setInterval(() => {
  //     setTimeLeft((prevTimeLeft) => {
  //       // If time is up, clear the timer and stop updating
  //       if (prevTimeLeft <= 0) {
  //         clearInterval(timer);
  //         return 0;
  //       }
  //       return prevTimeLeft - 1000; // Decrease time by 1 second (1000 milliseconds)
  //     });
  //   }, 1000);
  //   // console.log(Math.floor(timeLeft / (1000 * 60 * 60)) + " " +  Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60) ) + " " +  Math.floor((timeLeft % (1000 * 60)) / 1000))

  //   // Cleanup function to clear the interval on component unmount
  //   return () => clearInterval(timer);
  // }, []);

  // // Convert timeLeft in milliseconds to hours, minutes, and seconds
  // const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  // const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  // const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);



  const form = useForm();
  const { handleSubmit, formState, register, reset } = form;
  const { errors } = formState;
  const [productDetails ,setProductDetails] = useState(false)
  const [productId,setProductId] = useState()
  const [mobileUI,setMobileUI] = useState(false)

  const { Modal, openModal, closeModal, isOpen } = useModal();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { user, login, logout } = useAuth();
  const [eye, setEye] = useState(false);

  const hide = !eye ? faEye : faEyeSlash;
  const type = !eye ? "password" : "text";


  useEffect(() => {
    reset();
  }, [isOpen]);


  const goToForm = () => {
    openModal();
  };

  const goToRegister = () => {
    openModal();
    dispatch({ type: "REGISTER" });
  };

  const goToForgot = () => {
    reset();
    dispatch({ type: "FORGOT" });
  };

  const goToLogin = () => {
    reset();
    dispatch({ type: "LOGIN" });
  };

  const closeLogin = () => {
    closeModal();
    dispatch({ type: "LOGIN" });
  };

  const goToProduct = (product) => {
      setProductDetails(true)
      setProductId(product)

      if(window.screen.availWidth <= 720) {
        setMobileUI(true)
        return
     }
  }

  const submit = (data, element, setMessage) => {
    dispatch({ type: "LOGIN" });
    showBackdrop();

    if (element.id === "login") {
      if (data?.email || data?.password) {
        axios
          .post(environtment.api + "auth/" + "login", data)
          .then((response) => {
            if (response?.data?.session?.verified === 1) {
              secureLocalStorage.setItem(
                "authenticate",
                JSON.stringify(response.data)
              );
              navigate("/Home", { replace: true });
              login(response.data.session);
              showSnackbar(LOGIN_SUCCESFULLY, SUCCESS);
              return;
            } else if (response?.data?.session?.verified === 0) {
              showSnackbar(NOT_VERIFIED, ERROR);
              return;
            }
          })
          .catch((err) => {
            setMessage(err?.response?.data?.message);
            showSnackbar(LOGIN_FAILED, ERROR);
          })
          .finally(() => {
            hideBackdrop();
            closeModal();
          });
        return;
      }

      return;
    }

    if (element.id === "register") {
      createData(environtment.api + "auth/" + "register", data)
        .then((response) => {
          showSnackbar(CREATE_SUCCESSFULLY, SUCCESS);
        })
        .catch((err) => {
          showSnackbar(CREATE_FAILED, ERROR);
        });
      hideBackdrop();
      closeModal();
      return;
    }


    if (element.id === "forgot") {
      createData(environtment.api + "auth/"  + "forgot-password", data)
        .then((response) => {
          showSnackbar(SEND_EMAIL_SUCCESFULLY, SUCCESS);
        })
        .catch((err) => {
          showSnackbar(SEND_EMAIL_FAILED, ERROR);
        });
      hideBackdrop();
      closeModal();
      return;
    }

    hideBackdrop();
    closeModal();
  };


  const Dispatch = () => {
    openModal()
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

            {
              routeConfig[0].children.map((mapped,index) => mapped.parentnavigation  ? <Link to={mapped.path} className="page-navigation" key={index}  style={{textTransform:'capitalize'}} onClick={closeFlow}> <FontAwesomeIcon icon={mapped.icons}/> {mapped.path}</Link> : null)
            }


            <li className="page-navigation" onClick={goToForm}>
              <FontAwesomeIcon icon={faRightToBracket} /> Login{" "}
            </li>
            <li className="page-navigation" onClick={goToRegister}>
              <FontAwesomeIcon icon={faUserPlus} />
              Signup{" "}
            </li>
          </ul>
        </nav>

        {mobileUI ? null : <Search goToCart={setProductDetails}/>} 
         {
          productDetails ?  <Productdetails productId={productId} setProductDetails={setProductDetails} Dispatch={Dispatch} loginState={dispatch} setMobileUI={setMobileUI}/> : <Outlet context={{goToProduct: goToProduct, Dispatch: Dispatch, setMobileUI: setMobileUI,mobileUI:mobileUI}} />
         }
        
      </div>
      <Modal
        content={
          <>
            <div id="login-exit">
              <FontAwesomeIcon
                icon={faXmark}
                className="page-navigation"
                onClick={closeLogin}
              />
            </div>

            {authState.login ? (
              <Login
                goToForgot={goToForgot}
                toSubmit={submit}
                className={authState.register ? "active" : null}
              />
            ) : null}
            {authState.forgot ? (
              <Forgot
                goToLogin={goToLogin}
                toSubmit={submit}
                className={authState.register ? "active" : null}
              />
            ) : null}
            {authState.register ? <Register toSubmit={submit} /> : null}
          </>
        }
    
      />
      <BackdropComponent />
      <SnackbarComponent />
      <Footer />
    </>
  );
};

export default Landing;
