import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateProfile } from "../services/allApi";

const EditProfile = ({ userDetails }) => {
  const [openModal, setOpenModal] = useState(false);

  const [editData, setEditData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    bio: "",
    proPic: "",
  });

  useEffect(() => {
    setEditData(userDetails);
  }, [userDetails]);

  const [preview, setPreview] = useState(
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
  );

  const onImageChange = (e) => {
    //  e.target.files is an array and in its 0 th index we can access the file
    console.log(e.target.files[0]);

    // in this method js will store the file in a storage mechanism and returns the path to that file
    let url = URL.createObjectURL(e.target.files[0]);

    setEditData({ ...editData, proPic: e.target.files[0] });

    console.log(url);
    setPreview(url);
  };

  const onEditClick = async () => {
    try {
      if (
        editData.userName == "" ||
        editData.bio == "" ||
        editData.password == "" ||
        editData.proPic == "" ||
        editData.confirmPassword == ""
      ) {
        toast.error("Please fill the form");
      } else {
        if (editData.confirmPassword == editData.password) {
          // procceed with apicall

          let token = localStorage.getItem("token");

          let header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          };

          let reqBody = new FormData()

          for (let key in editData) {
            reqBody.append(key,editData[key])
          }

          let apiResponse = await updateProfile(editData._id,reqBody,header)

          if(apiResponse.status==200){
            toast.success(apiResponse.data.message)
          }else{
            toast.error(apiResponse.response.data.message)
          }

        } else {
          toast.error("Password and Confirm Password should be same");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating");
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="text-blue-500 border rounded-xl border-blue-500 p-3 flex text-lg"
      >
        {" "}
        <FaEdit className="m-1" /> Edit
      </button>
      <Modal
        className="mx-60"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader className="bg-gray-500">Terms of Service</ModalHeader>
        <ModalBody className="bg-gray-600">
          <div className="space-y-6 flex flex-col items-center">
            <label htmlFor="imp">
              <input
                onChange={(e) => onImageChange(e)}
                type="file"
                name=""
                id="imp"
              />

              <img className="w-50" src={preview} alt="" />
            </label>

            <input
              className="bg-white rounded  border  p-2 w-100"
              type="text"
              placeholder="UserName"
              onChange={(e) =>
                setEditData({ ...editData, userName: e.target.value })
              }
              value={editData.userName}
            />
            <input
              className="bg-white rounded  border  p-2 w-100"
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setEditData({ ...editData, password: e.target.value })
              }
              value={editData.password}
            />
            <input
              className="bg-white rounded  border  p-2 w-100"
              type="password"
              placeholder="Confirm Passwrod"
              onChange={(e) =>
                setEditData({ ...editData, confirmPassword: e.target.value })
              }
            />

            <textarea
              onChange={(e) =>
                setEditData({ ...editData, bio: e.target.value })
              }
              value={editData.bio}
              className="bg-white rounded  border  p-2 w-100"
              placeholder="Bio"
              name=""
              id=""
            ></textarea>
          </div>
        </ModalBody>
        <ModalFooter className="bg-gray-500">
          <Button className="bg-green-600 text-white p-2 me-3 rounded " onClick={onEditClick}>Edit</Button>
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditProfile;
