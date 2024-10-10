import React, {useState} from 'react'

import "../App.css";

import { useForm } from "react-hook-form";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

import useBackdrop from "../Api/useBackdrop";
import useQueryHooks from "../Api/useQueryHook"
import useSnackbar from '../Api/useSnakbar';
import { environtment } from '../Environment/environment';

function Register({toSubmit}) {

  const form = useForm();
  const [eye, setEye] = useState(false);
  const [message, setMessage] = useState('');
  const { BackdropComponent, showBackdrop, hideBackdrop } = useBackdrop();
  const { SnackbarComponent, showSnackbar,setOpenSnackbar, openSnackbar} = useSnackbar();
  const { data, queryLoading, queryError, setError, createProfile, updateProfile, deleteProfile } = useQueryHooks(environtment.api + "all-profile/",openSnackbar);
  

  const hide = !eye ? faEye : faEyeSlash;
  const type = !eye ? "password" : "text";

  const { handleSubmit, formState, register, reset } = form;
  const { errors } = formState;
 
  const  submit = (data) => {
  const element = document.activeElement 
  toSubmit(data,element)
  }



  return (
   
    <form className="form" onSubmit={handleSubmit(submit)}>
      
      <div className="form-header-container">
        <h2 className="greet-headers">Register Account</h2>
      </div>

      <div className="inputGroup">
        <span className="icons-contain">
          <FontAwesomeIcon icon={faUserLarge} className="input-icons" />
        </span>
        <input
          className="input-fields"
          type="text"
          {...register("firstName", {
            required: {
              value: true,
              message: "*First name is required",
            },
          })}
        />
        <label htmlFor="firstname" className="input-labels">
          First Name
        </label>
      </div>

      <p className="errors-message">{errors.firstName?.message}</p>


      <div className="inputGroup">
        <span className="icons-contain">
          <FontAwesomeIcon icon={faUserGroup} className="input-icons" />
        </span>
        <input
          className="input-fields"
          type="text"
          {...register("lastName", {
            required: {
              value: true,
              message: "*Last name is required",
            },
          })}
        />
        <label htmlFor="lastname" className="input-labels">
          Last Name
        </label>
      </div>

      <p className="errors-message">{errors.lastName?.message}</p>


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
              Email
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
        <label htmlFor="password" className="input-labels">
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


      <div className="form-header-container">
            <p className="greet-paragraph">
               By creating and/or using your account, you agree to our Terms of Use  and Privacy Policy.
            </p>
      </div>



      <div className="form-navigate">
        <Button variant="contained" color="primary" type="submit" id="register">
          Create Account
        </Button>
      </div>
    </form>
    
  )
}

export default Register;
