import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import { environtment } from "../Environment/environment";
import useQueryHooks from "../Api/useQueryHook";
import OrderStatus from "./OrderStatus";
import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import EscapeNavigate from "./EscapeNavigate";

const Ordertracking = () => {
  const context = useOutletContext();
  const navigate = useNavigate();
  const form = useForm();
  const [mobileView,setMobileView] = useState(false)
  const { handleSubmit, formState, register } = form;
  const { errors } = formState;
  const [sendReviews, setSendReviews] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [files, setFiles] = useState([]);
  const [showStatus, setShowStatus] = useState({
    status: false,
    product: "",
  });
  const authenticatedUser = JSON.parse(
    secureLocalStorage.getItem("authenticate")
  );
  const { Dispatch, setMobileUI, mobileUI } = context;
  const { session } = authenticatedUser;



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
    createFormData,
  } = useQueryHooks(environtment.api + "order/" + "all-orders/" + session.id);

  useEffect(() => {
    if(window.screen.availWidth <= 720) {
      setMobileView(true)
      return
   }
  }, [])

  const openForm = () => {
    if (authenticatedUser != null) {
      navigate("/Home");
      return;
    }

    Dispatch({ type: "LOGIN" });
  };

  const goToStatus = (productId) => {
    setShowStatus({
      status: true,
      product: productId,
    });
  };

  const setReviews = (productId) => {
    setSelectedProduct((prevId) => (prevId === productId ? null : productId));
    setSendReviews((prevState) => !prevState);
  };

  const submit = (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("user_id", session.id);
    formData.append("product_id", selectedProduct);
    formData.append("comment", data.comment);
    formData.append("files", data.files[0]);

    if (data.files && data.files.length > 0) {
      for (let i = 0; i < data.files.length; i++) {
        formData.append("files", data.files[i]);
      }

      createFormData(environtment.api + "review/" + "create-reviews", formData)
        .then((response) => {
          console.log(response);
          setSelectedProduct(null);
        })
        .catch((err) => {
          console.log(err);
          setSelectedProduct(null);
        });
      return;
    }

      createFormData(environtment.api + "review/" + "create-reviews", formData)
        .then((response) => {
          console.log(response);
          setSelectedProduct(null);
        })
        .catch((err) => {
          console.log(err);
          setSelectedProduct(null);
        });

      return;
 
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const removeFile = (fileToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  return (
    <>
    {mobileView ?  <EscapeNavigate setMobileUIRoute={setMobileUI} mobileUI={mobileUI}/> : null}

      {showStatus.status ? (
        <OrderStatus
          productId={{ showStatus: showStatus, setShowStatus: setShowStatus }}
        />
      ) : (
        <div className="shop-container">
          {!data?.length ? (
            <div
              className={
                !data?.length
                  ? "shop-list-card " + "absolute_height"
                  : "shop-list-card"
              }
            >
              <h3>No Item Added yet</h3>
              <button className="shop-button" onClick={openForm}>
                Continue Shop
              </button>
            </div>
          ) : (
            <div
              id="order-personal-address"
              style={{
                background: "#e9ebee",
                display: "flex",
                flexDirection: "column",
                rowGap: "1em",
                paddingTop: "5em",
              }}
            >
              {data?.map((mapped, index) => (
                <div className="order-item-container" key={index}>
                  <div
                    className="order-address-detail"
                    style={{ padding: "1.5em", background: "#fff" }}
                    onClick={() => goToStatus(mapped)}
                  >
                    <div id="order-item-image">
                      <img className="product-image" src={mapped?.image_url} />
                    </div>

                    <div
                      className="order-item-description"
                      style={{ columnGap: "1.5em" }}
                    >
                      <div className="order-item-information">
                        <p className="order-item-paragraph">
                          <span>{mapped?.name}</span>
                        </p>
                        <p className="order-item-paragraph">Size</p>
                      </div>

                      <div className="order-item-information">
                        <p
                          className="order-item-paragraph "
                          style={{ maxWidth: "20em" }}
                        >
                          Billing address : {mapped?.billing_address}
                        </p>
                      </div>

                      <div className="order-item-information">
                        <p className="order-item-paragraph order-original">
                          {" "}
                          &#8369; {mapped?.sale_price}
                        </p>
                        <p className="order-item-paragraph order-dicounted">
                          {" "}
                          &#8369; {mapped?.price}
                        </p>
                        <p className="order-item-paragraph">
                          {" "}
                          {Math.round(
                            (mapped?.sale_price / mapped?.price) * 100
                          )}{" "}
                          % off
                        </p>
                      </div>

                      <div className="order-item-information">
                        <p className="order-item-paragraph">
                          Quantity : {mapped?.quantity}
                        </p>
                        <p className="order-item-paragraph">
                          Total Amount : {mapped?.total_amount}
                        </p>
                      </div>
                    </div>

                    <div
                      className="order-address-detail"
                      key={index}
                      style={{ padding: "1.5em", background: "#fff" }}
                    ></div>
                  </div>
                  {mapped?.status === "delivered" ? (
                    <div className="order-item-reviews">
                      <p
                        className="order-item-quick-reviews"
                        onClick={() => setReviews(mapped.id)}
                      >
                        Quick Reviews{" "}
                      </p>
                      <div className="order-item-quick-reviews">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <FontAwesomeIcon
                            key={starIndex}
                            icon={faStar}
                            className="grey-star"
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {selectedProduct === mapped.id && (
                    <div
                      className={
                        sendReviews ? "order-item-reviews" : "show_less"
                      }
                      style={{
                        marginTop: "1em",
                        flexDirection: "column",
                        height: "auto",
                      }}
                    >
                      <div className="file-previews">
                        {files.map((file, index) => (
                          <div key={index} className="file-preview">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="file-photo"
                            />
                            <button
                              type="button"
                              className="remove-photo-reviews"
                              onClick={() => removeFile(file)}
                            >
                              <FontAwesomeIcon
                                icon={faXmark}
                                className="grey-star"
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                      <form
                        className="messageBox"
                        onSubmit={handleSubmit(submit)}
                      >
                        <div className="fileUploadWrapper">
                          <label htmlFor="file">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 337 337"
                            >
                              <circle
                                strokeWidth="20"
                                stroke="#6c6c6c"
                                fill="none"
                                r="158.5"
                                cy="168.5"
                                cx="168.5"
                              ></circle>
                              <path
                                strokeLinecap="round"
                                strokeWidth="25"
                                stroke="#6c6c6c"
                                d="M167.759 79V259"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeWidth="25"
                                stroke="#6c6c6c"
                                d="M79 167.138H259"
                              ></path>
                            </svg>
                            <span className="tooltip">Add an image</span>
                          </label>
                          <input
                            type="file"
                            id="file"
                            multiple
                            {...register("files", {
                              required: {
                                value: false,
                              },
                              onChange: handleFileChange,
                            })}
                          />
                        </div>
                        <input
                          required=""
                          placeholder="Message..."
                          type="text"
                          id="messageInput"
                          {...register("comment", {
                            required: {
                              value: true,
                            },
                          })}
                        />
                        <button type="submit" id="sendButton">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 664 663"
                          >
                            <path
                              fill="none"
                              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                            ></path>
                            <path
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              strokeWidth="33.67"
                              stroke="#6c6c6c"
                              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                            ></path>
                          </svg>
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Ordertracking;
