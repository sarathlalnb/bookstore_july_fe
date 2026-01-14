import React, { use, useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { getAllBooks } from "../services/allApi";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";


const Books = () => {

  const {token} = useContext(authContext)

  console.log(token)

  const [isloggedIn, setIsLoggedIn] = useState(false);

  const [bookData, setBookData] = useState([]);
  const [duplicateBookData, setDuplicateBookData] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      getBookData();
    }
  }, [searchKey]);

  const getBookData = async () => {
    try {
      // let token = localStorage.getItem("token");

      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getAllBooks(header, searchKey);

      if (apiResponse.status == 200) {
        setBookData(apiResponse.data.bookData);
        setDuplicateBookData(apiResponse.data.bookData);

        let category = [];

        apiResponse.data.bookData.forEach((eachBook) => {
          if (!category.includes(eachBook.category)) {
            category.push(eachBook.category);
          }
        });
        setAllCategories(category);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterByCategory = (category) => {
    let filteredBooks = duplicateBookData.filter(
      (eachBook) => eachBook.category == category
    );
    console.log(filteredBooks);
    setBookData(filteredBooks);
  };

  return (
    <>
      <Header />

      {isloggedIn ? (
        <>
          <h1 className="text-center text-4xl">Collections</h1>

          <div className="flex justify-center p-6">
            <input
              onChange={(e) => setSearchKey(e.target.value)}
              type="text"
              placeholder="Search By Title"
              className="border p-2 w-100"
            />
            <button className="text-amber-50 bg-blue-900 p-2 border-gray-950 border-2">
              search
            </button>
          </div>

          <div className="grid grid-cols-6 gap-4 mt-5">
            <div className="col-span-1 ms-10">
              <h1 className="text-3xl mb-5">Filters </h1>
              <div className="flex flex-col">
                <div onClick={getBookData}>
                  <input
                    id="inp"
                    name="category"
                    className="me-3"
                    type="radio"
                  />
                  <label htmlFor="inp" className="">
                    All
                  </label>
                </div>

                {allCategories.map((eachCategory, index) => (
                  <div onClick={() => filterByCategory(eachCategory)}>
                    <input
                      id={index}
                      name="category"
                      className="me-3"
                      type="radio"
                    />
                    <label htmlFor={index} className="">
                      {eachCategory}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {bookData?.length > 0 ? (
              <div className="grid grid-cols-[1fr_1fr_1fr] gap-5">
                {bookData?.map((eachBook) => (
                  <div className="w-75">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
                      <img
                        className="w-full"
                        src={eachBook.imgURL}
                        alt="Book Cover"
                      />
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                          {eachBook.title}
                        </div>
                        <p className="text-gray-700 text-base">
                          {eachBook.author}
                        </p>
                      </div>
                      <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          {eachBook.price} $
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          {eachBook.publisher}
                        </span>
                      </div>
                      <Link to={`/view/${eachBook._id}/book`} className="bg-blue-600 text-white font-bold p-1">
                        View More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h1>Noo Books Available</h1>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <img
            className="w-50"
            src="https://cdn-icons-gif.flaticon.com/17905/17905768.gif"
            alt=""
          />
          <h1 className="text-4xl">
            Please{" "}
            <Link className="text-red-600 font-bold" to={"/login"}>
              Login
            </Link>{" "}
            to access all books{" "}
          </h1>
        </div>
      )}
    </>
  );
};

export default Books;
