import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const useQuery = (url, refreshData) => {
  const [data, setData] = useState(null);
  const [queryLoading, setLoading] = useState(true);
  const [queryError, setError] = useState(false);

  const fetchData = async () => {
    
    try {
      const response = await axios.get(url);
      setLoading(false)
      setData(response.data);
      
      return;

    } catch (err) {
      setLoading(false)
      setError(err || true);
      return;

    }
  };

  useEffect(() => {
    fetchData();
  }, [url,refreshData]); 

  const createData = (postUrl, newItem) => {
    return axios.post(postUrl, newItem);
  };

  const updateData = (putUrl, updatedItem) => {
    return axios.put(putUrl, updatedItem)
  };

  const deleteData = (deleteUrl) => {
    return axios.delete(deleteUrl, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("authenticate")).token
        }`,
      },
    });
  };

  const getRegion = (regionUrl) => {
    return axios.get(regionUrl);
  };

  const getProvince = (provinceUrl) => {
    return axios.get(provinceUrl);
  };

  const getCity = (cityUrl) => {
    return axios.get(cityUrl);
  };

  const getBarangay = (barangayUrl) => {
    return axios.get(barangayUrl);
  };

  const getAddress = (addressUrl) => {
     return axios.get(addressUrl)
  }

  const getOrders = (addressUrl) => {
    return axios.get(addressUrl)
 }

 const getImageReviews = (reviewsUrl) => {
  return axios.get(reviewsUrl)
}

 const createFormData = (formUrl,newData) => {
  return axios.post(formUrl,newData , {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
 }






  return {
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
    getImageReviews,
    createFormData
  };
};

export default useQuery;
