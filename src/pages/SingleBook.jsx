import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { buyBook, getSingleBook } from "../services/allApi";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { baseURL } from "../services/baseURL";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";

const SingleBook = () => {
  let { id } = useParams();
  console.log(id);
  const [bookData, setBookData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const { token } = useContext(authContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getSingleBook(id, header);
      if (apiResponse.status == 200) {
        console.log(apiResponse.data);
        setBookData(apiResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onBuyClick = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51SocdXE7wNSw93VCk4QxdWX8rZybaN4MTt7Yz7Itbl8by3jcR35fUzevXpAnqoVmQ9pe5blRI1POMRU7bTH7rs1b00gzxtBRRn"
      );

      let reqBody = {
        bookId: bookData._id,
        bookName: bookData.title,
        bookDesc: bookData.abstract,
        bookImage: bookData.imgURL,
        sellerMail: bookData.userMail,
        price: bookData.price,
        discountPrice: bookData.discountPrice,
      };
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await buyBook(reqBody, header);

      if (apiResponse.status == 200) {
        let session = apiResponse.data.session;
        window.location.href = session.url;
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while doing payment");
    }
  };

  return (
    <>
      <Header />

      <div className="mx-30 border p-6 mt-10 flex justify-around bg-gray-200">
        <div>
          <img src={bookData?.imgURL} alt="Image" />
        </div>
        <div>
          <h1 className="text-center text-3xl font-bold">{bookData?.title}</h1>
          <div className="flex gap-3 mt-3">
            <h3>
              <span className="font-bold">Author: </span> {bookData.author}
            </h3>
            <h3>
              {" "}
              <span className="font-bold">Publisher: </span>{" "}
              {bookData.publisher}
            </h3>
          </div>
          <div className="flex gap-3 mt-3">
            <h3>
              {" "}
              <span className="font-bold">Price: </span>
              {bookData.price}
            </h3>
            <h3>
              {" "}
              <span className="font-bold">Discount Price : </span>
              {bookData.discountPrice}
            </h3>
          </div>

          <div className="flex gap-3 mt-3">
            <h3>
              <span className="font-bold">Number Of pages: </span>{" "}
              {bookData.noOfPages}
            </h3>
            <h3>
              <span className="font-bold">ISBN :</span>
              {bookData.ISBN}
            </h3>
          </div>
          <div className="flex gap-3 mt-3">
            <h3>
              <span className="font-bold">Language: </span> {bookData.language}
            </h3>
            <h3>
              <span className="font-bold">Category :</span>
              {bookData.category}
            </h3>
          </div>
        </div>
        <div>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-green-500 text-black rounded border p-3  "
          >
            More Images
          </button>
          <p className="mt-7">
            <span className="font-bold">Abstract :-</span> {bookData?.abstract}
          </p>

          <div className="mt-10">
            <Link className="bg-blue-500 p-3  " to={"/books"}>
              Go Back
            </Link>
            <button onClick={onBuyClick} className="bg-green-700 p-3 ms-10 text-white ">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <Modal
        className="mx-60"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader className="bg-gray-600 text-white">
          Uploaded Images
        </ModalHeader>
        <ModalBody className="bg-gray-600">
          <div className="space-y-6 flex justify-around">
            {bookData?.uploadedImages?.map((eachImageName) => (
              <img
                className="w-75"
                src={`${baseURL}/uploads/${eachImageName}`}
                alt=""
              />
            ))}
          </div>
        </ModalBody>
        <ModalFooter className="bg-gray-600">
          <Button
            className="text-xl bg-gray-800 p-2 rounded border"
            onClick={() => setOpenModal(false)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SingleBook;
