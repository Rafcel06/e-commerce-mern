import React, { useEffect, useReducer, useState } from "react";
import logo from "../Assets/product-1.jpg";
import {
  faStar,
  faArrowLeft,
  faPersonWalkingDashedLineArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useQueryHooks from "../Api/useQueryHook";
import { environtment } from "../Environment/environment";
import secureLocalStorage from "react-secure-storage";
import useDialog from "../Api/useDialog";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Orderdetails from "./Orderdetails";
import { ADD_CART, CONFIRMATION } from "../Utils/constant";

const Productdetails = ({ productId, setProductDetails, Dispatch }) => {
  const navigate = useNavigate();
  const [submitedForm, setSubmitedForm] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [imagesReviews, setImagesReviews] = useState([]);
  const {
    data,
    queryLoading,
    queryError,
    setError,
    createData,
    updateData,
    deleteData,
    getImageReviews,
    createFormData
  } = useQueryHooks(
    environtment.api + "review/" + "all-reviews/" + productId.id,
    submitedForm,
    cartCount
  );

  useEffect(() => {
    getImageReviews(environtment.api + "review/" + "image-reviews")
      .then((response) => {
        setImagesReviews(response?.data?.reviews);
        console.log(response?.data?.reviews)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { openDialog, DialogComponent } = useDialog();
  const [count, setCount] = useState(1);
  const [order, setOrder] = useState({
    order: false,
    product: productId,
  });

  const authenticatedUser = JSON.parse(
    secureLocalStorage.getItem("authenticate")
  );

  const goToLanding = () => {
    setProductDetails(false);
  };

  const openForm = () => {
    if (authenticatedUser != null) {
      setOrder({ order: true, productId, quantity: count });
      console.log("Authenticated !!!");
      return;
    }

    Dispatch({ type: "LOGIN" });
    console.log("Not Authenticated !!!");
    return;
  };

  const Increment = () => {
    if (count < productId.stock_quantity) {
      setCount(count + 1);
    }
  };

  const Decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleOpenDialog = (data) => {
    const dialogTitle = CONFIRMATION;
    const dialogMessage = ADD_CART;
    const confirmCallback = () => {
      addCart();
    };

    const closeCallback = () => {
      console.log("Dialog closed!");
    };

    openDialog(dialogTitle, dialogMessage, confirmCallback, closeCallback);
  };

  const addCart = () => {
    setSubmitedForm(true);
    const { session } = authenticatedUser;
    const cartInfo = {
      user_id: session.id,
      product_id: productId.id,
    };

    createData(environtment.api + "cart/" + "create-cart", cartInfo)
      .then((response) => {
        navigate("/home/shop");
        window.location.reload();
        setProductDetails(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {order.order ? (
        <Orderdetails
          setOrder={setOrder}
          order={order}
          setProductDetails={setProductDetails}
        />
      ) : (
        <>
          <div className="product-escape">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="product-detail-back"
              onClick={goToLanding}
            />
          </div>
          <div id="product-detail-page">
            <div className="product-detail-card">
              <div className="product-detail-image">
                <img
                  className="product-detail-specific"
                  src={productId?.image_url}
                />
              </div>

              <div className="product-detail-information">
                <div className="product-specific-detail">
                  <p className="product-detail-name">{productId?.name}</p>
                  <div className="product-detail-contain-rate">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="product-detail-rating"
                    />
                    <span className="product-detail-rating">Rating of 13</span>
                  </div>
                  <p className="product-detail-brand">
                    Brand : {productId?.brand}
                  </p>
                </div>

                <div className="product-detail-price">
                  <p className="product-detail-price-peso">
                    &#8369; {productId?.price}
                  </p>
                  <p className="product-detail-price-discount">
                    &#8369; {productId?.sale_price} -{" "}
                    {Math.round(
                      (productId?.sale_price / productId?.price) * 100
                    )}{" "}
                    % off
                  </p>
                </div>

                <div
                  className="product-detail-quantity"
                  style={{ padding: "1em 0" }}
                >
                  <p className="product-detail-number">Quantity : </p>
                  <button className="add-deduct" onClick={Increment}>
                    +
                  </button>
                  <p className="product-detail-number"> {count} </p>
                  <button className="add-deduct" onClick={Decrement}>
                    -
                  </button>
                </div>

                <div className="product-detail-buy-add">
                  <button className="product-action-btn" onClick={openForm}>
                    Buy Now
                  </button>
                  <button
                    className="product-action-btn"
                    onClick={authenticatedUser ? handleOpenDialog : openForm}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="product-list-review">
            <div className="product-review-cards">
              <div className="product-review-rate">
                <p className="product-review">4.6</p>
                <p className="product-review-star">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="product-detail-rating"
                  />
                </p>
                <span className="product-review-rating">Rating of 13</span>
              </div>

              <div className="product-review-rate">
                <div className="rating">
                  <div className="stars">
                    <span className="star">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="product-detail-rating"
                      />
                    </span>
                    <span className="star">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="product-detail-rating"
                      />
                    </span>
                    <span className="star">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="product-detail-rating"
                      />
                    </span>
                    <span className="star">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="product-detail-rating"
                      />
                    </span>
                    <span className="star">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="product-detail-rating"
                      />
                    </span>
                  </div>

                  <div className="bar">
                    <div className="bar-fill" style={{ width: "80%" }}></div>
                  </div>
                </div>

                <div className="rating">
                  <div className="stars">
                    <span className="star">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="product-detail-rating"
                      />
                    </span>
                    <span className="star">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="product-detail-rating"
                      />
                    </span>
                    <span className="star">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="product-detail-rating"
                      />
                    </span>
                    <span className="star">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="product-detail-rating"
                      />
                    </span>
                  </div>

                  <div className="bar">
                    <div className="bar-fill" style={{ width: "60%" }}></div>
                  </div>
                </div>

                <div className="rating">
                  <div className="stars">
                    <span className="star">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="product-detail-rating"
                      />
                    </span>
                    <span className="star">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="product-detail-rating"
                      />
                    </span>
                    <span className="star">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="product-detail-rating"
                      />
                    </span>
                  </div>

                  <div className="bar">
                    <div className="bar-fill" style={{ width: "40%" }}></div>
                  </div>
                </div>

                <div className="rating">
                  <div className="stars">
                    <span className="star">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="product-detail-rating"
                      />
                    </span>
                    <span className="star">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="product-detail-rating"
                      />
                    </span>
                  </div>

                  <div className="bar">
                    <div className="bar-fill" style={{ width: "20%" }}>
                      {" "}
                    </div>
                  </div>
                </div>

                <div className="rating">
                  <div className="stars">
                    <span className="star">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="product-detail-rating"
                      />
                    </span>
                  </div>

                  <div className="bar">
                    <div className="bar-fill" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </div>

              <div className="product-review-rate"></div>
            </div>
          </div>

          <div className="product-list-review-comment">
            {data?.map((mapped, index) => (
              <div className="review-card" key={index}>
                <div className="review-header">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Reviewer"
                    className="review-avatar"
                  />
                  <div className="review-info">
                    <h3 className="reviewer-name">{mapped?.fullName}</h3>
                    <p className="review-date">
                      {moment(mapped?.created_at.slice(0, 10), "YYYY-MM-DD")
                        .local()
                        .format("LL")}
                    </p>
                  </div>
                </div>

                <div className="review-rating-comment">
                  {Array.from({ length: mapped?.rating }).map(
                    (__, starIndex) => {
                      return (
                        <span className="star" key={starIndex}>
                          <FontAwesomeIcon
                            icon={faStar}
                            className="product-detail-rating"
                          />{" "}
                        </span>
                      );
                    }
                  )}
                </div>
                <p className="review-text">{mapped?.comment}</p>
                <div className="review-rating-images">
                  <div className="review-rating-images">
                    {Array.isArray(imagesReviews) &&
                      imagesReviews
                        .filter(
                          (mappedImg) => mapped?.id === mappedImg?.review_id
                        )
                        .map((filteredImg, index) => (
                          <div className="review-images-contain" key={index}>
                            <img
                              src={filteredImg?.file_key}
                              className="review-image"
                            />
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <DialogComponent />
    </>
  );
};

export default Productdetails;
