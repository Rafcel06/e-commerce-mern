import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
import useQueryHooks from "../Api/useQueryHook";
import { environtment } from "../Environment/environment";


const VerifyEmail = () => {
  const {
    data,
    queryLoading,
    queryError,
    setError,
    createData,
    updateData,
    deleteData,
    getImageReviews,
    createFormData,
  } = useQueryHooks();


  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const email = query.get("email");
  const id = query.get("id");

  if(!email || !id) {
     navigate('/');
  }

  const Verified = () => {
    updateData(environtment.api + "auth/" + "update-profile/" + id, {verified:1})
    .then((response) =>  { 
        console.log(response)
        navigate("/");
  })
    .catch((err) => console.log(err))
  }

  return (
    <div className="container-verify">
      <div className="card">
        <div className="greeting">{email}</div>
        <h2 className="title">Verify Your Email</h2>
        <p>Please click the button to verify your account.</p>
        <button className="verify-btn" onClick={Verified}>Activate Account</button>
      </div>
    </div>
  );
};

export default VerifyEmail;
