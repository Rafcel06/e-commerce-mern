import React, { useState, useEffect } from "react";
import Logo from "../Assets/dashboards.png";
import "../App.css";
import axios from "axios";

import { useForm } from "react-hook-form";
import secureLocalStorage from "react-secure-storage";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthGuard/Auth";
import { environtment } from "../Environment/environment";
import { Button } from "@mui/material";
import useBackdrop from "../Api/useBackdrop";

function Login({goToForgot,toSubmit}) {
  const form = useForm();
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();
  const [eye, setEye] = useState(false);
  const [message, setMessage] = useState();
  const { BackdropComponent, showBackdrop, hideBackdrop } = useBackdrop();

  const hide = !eye ? faEye : faEyeSlash;
  const type = !eye ? "password" : "text";

  const { handleSubmit, formState, register } = form;
  const { errors } = formState;

  const toForgot = () => {
    goToForgot()
  };

  const submit = (data) => {
    const element = document.activeElement 
    toSubmit(data,element,setMessage)
  

  };

  return (
    <>
      {/* <div className="formContainer"> */}
        <form className="form" onSubmit={handleSubmit(submit)}>
          
          <div className="form-header-container">
            <h2 className="greet-headers">Welcome to E-commerce store</h2>
            <p className="greet-paragraph">
              This access is for E-commerce user only. Please provide your
              Username and Password to continue.
            </p>
          </div>

          <div className="inputGroup">
            <span className="icons-contain">
              <FontAwesomeIcon icon={faCircleUser} className="input-icons" />
            </span>
            <input
              className="input-fields"
              type="text"
              {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "*Input a valid email",
                },
                required: {
                  value: true,
                  message: "*Email is required",
                },
              })}
            />
            <label htmlFor="name" className="input-labels">
              Name
            </label>
          </div>

          <p className="errors-message">{errors.email?.message}</p>

          <div className="inputGroup">
            <span className="icons-contain">
              <FontAwesomeIcon icon={faKey} className="input-icons" />
            </span>
            <input
              className="input-fields"
              type={type}
              style={{ width: "80%" }}
              {...register("password", {
                required: {
                  value: true,
                  message: "*Password is required",
                },
              })}
            />
            <label htmlFor="name" className="input-labels">
              Password
            </label>
            <span className="icons-contain">
              <FontAwesomeIcon
                icon={hide}
                className="input-icons"
                onClick={() => setEye(!eye)}
              />
            </span>
          </div>
          <p className="errors-message">
            {!message ? errors.password?.message : message}
          </p>



          <div className="form-navigate">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              id="login"
            >
              Login
            </Button>
          </div>

          <div className="form-navigate">
            <div id="remember">
              <input type="checkbox" id="checkbox" />
              <p>Remember me</p>
            </div>
            <p className="input-paragraph" onClick={toForgot}>
              Forgot Password
            </p>
          </div>

        </form>
      {/* </div> */}
      <BackdropComponent />
    </>
  );
}

export default Login;
