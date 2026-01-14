import React, { use, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { addBook, getUserDetails } from "../services/AllApi";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  const [sellBookFlag, setSellBookFlag] = useState(true);
  const [bookStatusFlag, setBookStatusFlag] = useState(false);
  const [purchaseFlag, setPurchaseFlag] = useState(false);

  const [preview, setPreview] = useState(
    "https://content.hostgator.com/img/weebly_image_sample.png"
  );

  const [previewArray, setPreviewArray] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    noOfPages: 0,
    imgURL: "",
    price: 0,
    discountPrice: 0,
    abstract: "",
    publisher: "",
    language: "",
    ISBN: "",
    category: "",
    uploadedImages: [],
  });


  useEffect(()=>{
    getUserData()
  },[])

  const getUserData = async () => {
    try {
      let token = localStorage.getItem("token");

      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getUserDetails(header);

      if (apiResponse.status == 200) {
        setUserDetails(apiResponse.data);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching user details");
    }
  };

  const onImageClick = (e) => {
    console.log(e.target.files[0]);

    setBookData({
      ...bookData,
      uploadedImages: [...bookData.uploadedImages, e.target.files[0]],
    });

    let imgURL = URL.createObjectURL(e.target.files[0]);
    console.log(imgURL);
    setPreview(imgURL);
    setPreviewArray([...previewArray, imgURL]);
  };

  const onAddClick = async () => {
    try {
      let token = localStorage.getItem("token");

      let headers = {
        // Multipart form data is a way for a web form to send files and other information to a server.

        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      // FormData is used to encode the file uploading , if the request has file uploading we must pass the request body as FormData

      let reqBody = new FormData();

      for (let key in bookData) {
        if (key != "uploadedImages") {
          reqBody.append(key, bookData[key]);
        } else {
          bookData.uploadedImages.forEach((eachFile) => {
            reqBody.append("uploadedImages", eachFile);
          });
        }
      }

      let apiResponse = await addBook(reqBody, headers);
      console.log(apiResponse);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Header />
      <div className="relative">
        <div className="h-40 bg-indigo-950"></div>
        <div className="absolute left-20 top-15 border-white border-15 rounded-full w-50 h-50">
          <img
            className="rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7csvPWMdfAHEAnhIRTdJKCK5SPK4cHfskow&s"
            alt=""
          />
        </div>
        <div className="p-20">
          <div className="pt-20 pb-10 flex justify-between">
            <h1 className="text-3xl flex">
              Jam <FaCheckCircle className="m-1 text-xl my-3 text-blue-500" />
            </h1>
            <EditProfile userDetails={userDetails} />
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Perferendis nesciunt nostrum temporibus vero ex repudiandae officiis
            inventore a. Itaque expedita placeat delectus esse quisquam
            repellendus ut et illo nisi consequuntur?Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Odit sapiente repellat sunt odio
            accusamus maiores veniam necessitatibus, eaque tenetur omnis. Cum,
            praesentium recusandae? Officiis odit, laboriosam eligendi placeat
            ad enim.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            setSellBookFlag(true);
            setPurchaseFlag(false);
            setBookStatusFlag(false);
          }}
          className="border p-2 m-1 rounded-2xl cursor-pointer "
        >
          Sell Book
        </button>
        <button
          onClick={() => {
            setSellBookFlag(false);
            setPurchaseFlag(false);
            setBookStatusFlag(true);
          }}
          className="border p-2 m-1 rounded-2xl cursor-pointer "
        >
          Book Status
        </button>
        <button
          onClick={() => {
            setSellBookFlag(false);
            setPurchaseFlag(true);
            setBookStatusFlag(false);
          }}
          className="border p-2 m-1 rounded-2xl cursor-pointer "
        >
          Purchase History
        </button>
      </div>

      {sellBookFlag && (
        <div className="mx-45 bg-gray-400 px-30 mt-10">
          <h1 className="text-4xl text-center py-10">Book Details</h1>
          <div className="flex gap-30">
            <div className="flex flex-col gap-4">
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, title: e.target.value })
                }
                placeholder="Title"
                type="text"
                className="w-100 p-2 rounded-xl text-black bg-white"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, author: e.target.value })
                }
                placeholder="Author"
                type="text"
                className="w-100 p-2 rounded-xl text-black bg-white"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, noOfPages: e.target.value })
                }
                placeholder="Number of Pages"
                type="number"
                className="w-100 p-2 rounded-xl text-black bg-white"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, imgURL: e.target.value })
                }
                placeholder="Image URL"
                type="text"
                className="w-100 p-2 rounded-xl text-black bg-white"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, price: e.target.value })
                }
                placeholder="Price"
                type="number"
                className="w-100 p-2 rounded-xl text-black bg-white"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, discountPrice: e.target.value })
                }
                placeholder="Discount Price"
                type="number"
                className="w-100 p-2 rounded-xl text-black bg-white"
              />
              <textarea
                onChange={(e) =>
                  setBookData({ ...bookData, abstract: e.target.value })
                }
                className="w-100 p-2 rounded-xl text-black bg-white"
                placeholder="Abstract"
                name=""
                id=""
              ></textarea>
            </div>
            <div className="flex flex-col gap-4">
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, publisher: e.target.value })
                }
                placeholder="Publisher"
                type="text"
                className="w-100 p-2 rounded-xl text-black bg-white"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, language: e.target.value })
                }
                placeholder="Language"
                type="text"
                className="w-100 p-2 rounded-xl text-black bg-white"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, ISBN: e.target.value })
                }
                placeholder="ISBN"
                type="text"
                className="w-100 p-2 rounded-xl text-black bg-white"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, category: e.target.value })
                }
                placeholder="Category"
                type="text"
                className="w-100 p-2 rounded-xl text-black bg-white"
              />

              <label htmlFor="imgUpload">
                <input
                  onChange={(e) => onImageClick(e)}
                  className="hidden"
                  type="file"
                  name=""
                  id="imgUpload"
                />
                <img className="w-75" src={preview} alt="" />
              </label>

              {previewArray.length > 0 && (
                <div className="flex gap-3">
                  {previewArray.map((eachPreview) => (
                    <img className="w-25" src={eachPreview} alt="" />
                  ))}

                  {previewArray.length < 3 && (
                    <label htmlFor="plus">
                      <input
                        onChange={(e) => onImageClick(e)}
                        className="hidden"
                        type="file"
                        name=""
                        id="plus"
                      />
                      <img
                        className="w-15"
                        src="https://cdn-icons-png.flaticon.com/512/11527/11527831.png"
                        alt=""
                      />
                    </label>
                  )}
                </div>
              )}
              <button className="bg-red-300" onClick={onAddClick}>
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}

      {bookStatusFlag && <div>Book status</div>}
      {purchaseFlag && <div>Purchase</div>}
    </div>
  );
};

export default Profile;
