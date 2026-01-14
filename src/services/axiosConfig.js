import axios from "axios";

const axiosConfig = async (method, url, reqBody,reqHeader) => {
  let configObj = {
    method: method,
    url: url,
    data: reqBody,
    headers:reqHeader
  };


  // multipart-formdata :- 
  // formData

  return await axios(configObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export default axiosConfig