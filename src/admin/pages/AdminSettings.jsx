import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { toast } from "react-toastify";
import { getUserDetails, updateProfile } from "../../services/AllApi";

const AdminSettings = () => {
  const [preview, setPreview] = useState(
    "https://thumbs.dreamstime.com/b/person-gray-photo-placeholder-man-costume-background-146157490.jpg"
  );

  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    proPic: "",
  });

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getUserDetails(header);
      console.log(apiResponse);
      setUserData(apiResponse.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching user details");
    }
  };

  const onImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));

    setUserData({ ...userData, proPic: e.target.files[0] });
  };

  const onResetClick = () => {
    setUserData({
      userName: "",
      password: "",
      confirmPassword: "",
      proPic: "",
    });
    setPreview('https://thumbs.dreamstime.com/b/person-gray-photo-placeholder-man-costume-background-146157490.jpg')
  };

  const onSubmitClick = async () => {
    try {
      if (
        userData.userName == "" ||
        userData.password == "" ||
        userData.confirmPassword == "" ||
        userData.proPic == ""
      ) {
        toast.error("Please Fill the form");
      } else {
        if (userData.password == userData.confirmPassword) {
          // proceed with apicall

          let reqBody = new FormData();

          for (let key in userData) {
            reqBody.append(key, userData[key]);
          }

          let token = localStorage.getItem("token");

          let header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          };

          let apiResponse = await updateProfile(userData._id, reqBody, header);

          if (apiResponse.status == 200) {
            toast.success("Successfully Updated profile");
          } else {
            toast.error(apiResponse.response.data.message);
          }
        } else {
          toast.error("Passwrod and confirm password must be the same");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating profile");
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="grid grid-cols-[3fr_9fr]">
        <AdminSidebar />
        <div>
          <h1 className="text-center text-2xl mt-5">Settings</h1>

          <div className="grid grid-cols-2 mt-10 gap-10 mx-10 ">
            <div className="text-xl text-center ">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum
                hic in eligendi itaque odit quo ut corporis, expedita optio
                quam, sint possimus, commodi asperiores laudantium autem
                quisquam quae dolorum ipsam.
              </p>

              <p className="mt-10">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Numquam debitis vel fugit placeat reprehenderit aspernatur iure
                molestiae obcaecati, modi maxime doloremque perspiciatis esse
                voluptate ex aperiam, autem aliquam temporibus eligendi?
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl border">
              <label htmlFor="pic">
                <img className="w-35 ms-50 mt-10" src={preview} alt="" />

                <input
                  onChange={(e) => onImageChange(e)}
                  className="hidden"
                  type="file"
                  name="pic"
                  id="pic"
                />
              </label>

              <div className="mt-4 text-center">
                <input
                  value={userData?.userName}
                  onChange={(e) =>
                    setUserData({ ...userData, userName: e.target.value })
                  }
                  className="bg-white text-black rounded-2xl p-2 w-100 "
                  type="text"
                  placeholder="User Name"
                />
              </div>

              <div className="mt-4 text-center">
                <input
                  value={userData?.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  className="bg-white text-black rounded-2xl p-2 w-100 "
                  type="password"
                  placeholder="Password"
                />
              </div>

              <div className="mt-4 text-center">
                <input
                value={userData.confirmPassword}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="bg-white text-black rounded-2xl p-2 w-100 "
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>

              <div className="mt-4 text-center">
                <button onClick={onResetClick} className="border w-29 p-1 rounded-2xl bg-amber-700 text-white">
                  Reset
                </button>
                <button
                  onClick={onSubmitClick}
                  className="border w-29 p-1 rounded-2xl ms-4 my-8 bg-green-700 text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
