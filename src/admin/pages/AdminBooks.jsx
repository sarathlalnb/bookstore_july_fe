import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { toast } from "react-toastify";
import { getAllBooks, getAllUsers } from "../../services/allApi";
import { baseURL } from "../../services/baseURL";

const AdminBooks = () => {
  const [showBooks, setShowBooks] = useState(true);

  const [showUsers, setShowUsers] = useState(false);

  const [bookData, setBookData] = useState([]);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getBookData();
    getUserData();
  }, []);

  const getBookData = async () => {
    try {
      let token = localStorage.getItem("token");

      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getAllBooks(header, "");

      if (apiResponse.status == 200) {
        setBookData(apiResponse.data.bookData);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failled to fetch book data");
    }
  };

  const getUserData = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getAllUsers(header);

      if (apiResponse.status == 200) {
        setUserData(apiResponse.data);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failled to fetch book data");
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="grid grid-cols-[3fr_9fr]">
        <AdminSidebar />
        <div>
          <div className="text-center mt-20">
            <button
              onClick={() => {
                setShowBooks(true);
                setShowUsers(false);
              }}
              className="border p-2 bg-gray-300 text-blue-900 me-10 hover:bg-blue-950
             hover:text-white cursor-pointer rounded"
            >
              Books
            </button>

            <button
              onClick={() => {
                setShowBooks(false);
                setShowUsers(true);
              }}
              className="border p-2 bg-gray-300 text-green-900  hover:bg-green-950
             hover:text-white cursor-pointer rounded"
            >
              Users
            </button>
          </div>

          {showBooks && (
            <div>
              {bookData?.length > 0 ? (
                <div className="grid grid-cols-3 mt-10 mx-2">
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
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h1>No Books Added</h1>
              )}
            </div>
          )}

          {showUsers && (
            <div>
              {userData?.length > 0 ? (
                <div className="grid grid-cols-3 gap-4 mt-10">
                  {userData?.map((eachUser) => (
                    <div className="border bg-amber-500 p-4 ">
                      <div>
                        <img
                          src={`${baseURL}/uploads/${eachUser.proPic}`}
                          alt=""
                        />
                      </div>

                      <h1>Name: {eachUser.userName}</h1>
                      <h1>Email: {eachUser.email}</h1>
                      <h1>Bio: {eachUser.bio}</h1>
                    </div>
                  ))}
                </div>
              ) : (
                <h1>No Users Found</h1>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminBooks;
