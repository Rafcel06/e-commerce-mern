import React, {useState,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { environtment } from '../Environment/environment'
import useQueryHooks from "../Api/useQueryHook";
import secureLocalStorage from 'react-secure-storage';





const AddressForm = ({setAddress,order}) => {

    const form = useForm()


    const { handleSubmit, register, formState } = form;
    const { errors} = formState;
    const [region, setRegion] = useState();
    const [province, setProvince] = useState();
    const [city, setCity] = useState();
    const [barangay, setBarangay] = useState();
    const authenticatedUser = JSON.parse(secureLocalStorage.getItem("authenticate"));
    const {session}  =  authenticatedUser
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
        getAddress
      } = useQueryHooks(environtment.api + "product/" + "all-products");


      useEffect(() => {
        getRegion(environtment.address + "regions")
          .then((response) => {
            setRegion(response?.data);
          })
          .catch((err) => {
            console.log(err);
          });
          
      }, []);

    const submit = (data) => {
         setAddress(data)
    }


    
  const fetchProvince = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const regionCode = selectedOption.dataset.region;

    getProvince(environtment.address + "regions/" + regionCode + "/provinces")
      .then((response) => {
        setProvince(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCity = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const cityCode = selectedOption.dataset.city;

    getCity(environtment.address + "provinces/" + cityCode + "/cities")
      .then((response) => {
        setCity(response.data);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBarangay = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const barangayCode = selectedOption.dataset.barangay;

    getBarangay(environtment.address + "cities/" + barangayCode + "/barangays")
      .then((response) => {
        setBarangay(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
     <form className="order-detail-form" onSubmit={handleSubmit(submit)}>
            <div className="order-detail-input-contain">
            <div className="form-group" style={{display:'none'}}>
                <input
                  required=""
                  className="form-control"
                  value={parseInt(order?.productId?.id ? order?.productId?.id : order?.productId?.product_id )}
                  name="user_id"
                  type="number"
                  {...register("product_id", {
                    required: {
                      value: true,
                    },
                  })}
                />
              </div>

              
            <div className="form-group" style={{display:'none'}}>
                <input
                  required=""
                  className="form-control"
                  value={session.id}
                  name="user_id"
                  type="number"
                  {...register("user_id", {
                    required: {
                      value: true,
                    },
                  })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <input
                  required=""
                  placeholder="Enter your Full Name"
                  className="form-control"
                  name="fullName"
                  type="text"
                  {...register("fullName", {
                    required: {
                      value: true,
                      message: "*Fullname is required",
                    },
                  })}
                />
                <p className="errors-message">{errors.fullName?.message}</p>
              </div>

              <div className="form-group">
                <label htmlFor="Phone">Mobile Number:</label>
                <input
                  required=""
                  placeholder="Enter your Phone"
                  className="form-control"
                  name="phone"
                  type="number"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "*Phone is required",
                    },
                  })}
                />
                <p className="errors-message">{errors.phone?.message}</p>
              </div>

              <div className="form-group">
                <label htmlFor="Other">Other Notes:</label>
                <input
                  required=""
                  placeholder="Enter your Notes"
                  className="form-control"
                  name="notes"
                  type="text"
                  {...register("notes", {
                    required: {
                      value: true,
                      message: "*Notes is required",
                    },
                  })}
                />
                <p className="errors-message">{errors.notes?.message}</p>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input
                  required=""
                  placeholder="Enter your Email"
                  className="form-control"
                  name="email"
                  type="text"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "*Email is required",
                    },
                  })}
                />
                <p className="errors-message">{errors.email?.message}</p>
              </div>
            </div>

            <div className="order-detail-input-contain">
              <div className="form-group">
                <label htmlFor="region">Regions:</label>
                <select
                  required=""
                  placeholder="Enter your Province"
                  className="form-control-select"
                  name="region"
                  {...register("region", {
                    required: {
                      value: true,
                      message: "*Region is required",
                    },
                    onChange: fetchProvince,
                  })}
                >
                  <option value="">select region</option>
                  {region?.map((mapped, index) => (
                    <option
                      value={mapped?.name}
                      key={index}
                      data-region={mapped?.code}
                      className="form-control-option"
                    >
                      {mapped?.name}
                    </option>
                  ))}
                </select>

                <p className="errors-message">{errors.region?.message}</p>
              </div>

              <div className="form-group">
                <label htmlFor="province">Province:</label>
                <select
                  required=""
                  placeholder="Enter your Province"
                  className="form-control-select"
                  name="province"
                  disabled={!province ? true : false}
                  {...register("province", {
                    required: {
                      value: true,
                      message: "*Province is required",
                    },
                    onChange: fetchCity,
                  })}
                >
                  <option value="">select province</option>
                  {province?.map((mapped, index) => (
                    <option
                      value={mapped?.name}
                      key={index}
                      data-city={mapped?.code}
                      className="form-control-option"
                    >
                      {mapped?.name}
                    </option>
                  ))}
                </select>

                <p className="errors-message">{errors.province?.message}</p>
              </div>

              <div className="form-group">
                <label htmlFor="city">City/Municipality:</label>
                <select
                  required=""
                  placeholder="Enter your City"
                  className="form-control-select"
                  name="city"
                  disabled={!city ? true : false}
                  {...register("city", {
                    required: {
                      value: true,
                      message: "*City is required",
                    },
                    onChange: fetchBarangay,
                  })}
                >
                  <option value="">select city</option>
                  {city?.map((mapped, index) => (
                    <option
                      value={mapped?.name}
                      key={index}
                      data-barangay={mapped?.code}
                      className="form-control-option"
                    >
                      {mapped?.name}
                    </option>
                  ))}
                </select>
                <p className="errors-message">{errors.city?.message}</p>
              </div>

              <div className="form-group">
                <label htmlFor="barangay">Barangay:</label>
                <select
                  required=""
                  placeholder="Enter your Full Name"
                  className="form-control-select"
                  name="barangay"
                  disabled={!barangay ? true : false}
                  {...register("barangay", {
                    required: {
                      value: true,
                      message: "*Barangay is required",
                    },
                  })}
                >
                  <option value="">select barangay</option>
                  {barangay?.map((mapped, index) => (
                    <option
                      value={mapped?.name}
                      key={index}
                      data-city={mapped?.code}
                      className="form-control-option"
                    >
                      {mapped?.name}
                    </option>
                  ))}
                </select>
                <p className="errors-message">{errors.barangay?.message}</p>
              </div>

              <div className="form-group">
                <label htmlFor="address">Subdivision/House no/Street: </label>
                <input
                  required=""
                  placeholder="Enter your Address"
                  className="form-control"
                  name="address"
                  type="text"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "*Address is required",
                    },
                  })}
                />
                <p className="errors-message">{errors.address?.message}</p>
              </div>

              <div className="form-group">
                <input
                  required=""
                  id="submit"
                  className="form-control"
                  type="submit"
                  value="Save"
           
                />
              </div>
            </div>
          </form> 
    </>
  )
}

export default AddressForm