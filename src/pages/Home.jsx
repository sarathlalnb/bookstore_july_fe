import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { getLimitedBooks } from "../services/allApi";

const Home = () => {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    getBookData();
  }, []);

  const getBookData = async () => {
    try {
      let apiResponse = await getLimitedBooks();
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        setBookData(apiResponse.data.limitedData);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somnething went wrong while getting book data");
    }
  };

  return (
    <>
      <Header />
      <div
        className="bg-cover bg-center w-full flex justify-center items-center"
        style={{
          backgroundImage:
            'url("https://imgs.search.brave.com/GXGnJnD7qGSlKN7PwSRNsHNR95OwRQZrlyFej6FTF3M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDQv/MjgwLzkwMC9zbWFs/bC9vcGVuLWJvb2st/b24tYS10YWJsZS13/aXRoLXN0YWNrcy1v/Zi1ib29rcy1vbi10/aGUtc2lkZXMtYmx1/cnJlZC1vbGQtbGli/cmFyeS1vbi1hLWJh/Y2tncm91bmQtcGhv/dG8uanBn")',
          height: "75vh",
        }}
      >
        <div>
          <h1 className="text-center text-5xl font-bold text-amber-50">
            Wonderful Gifts
          </h1>
          <h5 className="text-center text-2xl text-amber-50">
            Give your friends and family a book
          </h5>
          <input
            className="text-black w-100 mt-5 border rounded-2xl h-10 bg-white text-center"
            type="search"
            placeholder="Search Books"
          />
        </div>
      </div>

      <div className="mt-7">
        <h1 className="text-center text-3xl">New Arrivals</h1>
        <h1 className="text-center text-4xl">Explore Our Latest Collections</h1>
        {
          bookData?.length>0 &&
             <div className="grid grid-cols-[1fr_1fr_1fr_1fr] mt-7">

        {
          bookData?.map((eachBook)=>(
              <div className="max-w-sm rounded overflow-hidden shadow-lg mt-5 mx-auto">
            <img
              className="w-full"
              src="https://imgs.search.brave.com/VBkBMeKKexfbPWJFYs0V0hpoahBbnLKOOcCtzsuorC0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMucGVuZ3VpbnJh/bmRvbWhvdXNlLmNv/bS9jYXRlZ29yeS1p/bWFnZXMvdHJpYWQt/aHVtb3IucG5n"
              alt="Book Cover"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Worst Case Senario</div>
              <p className="text-gray-700 text-base">pocket guide</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #photography
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #travel
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #winter
              </span>
            </div>
          </div>
          ))
        }  
        
        </div>
        }
     
        <div className="text-center">
          <button
            className=" border bg-blue-600 hover:bg-white m-5 p-3"
            type="button"
          >
            Explore More
          </button>
        </div>
      </div>
      <div className="flex justify-around items-center gap-5 m-7">
        <div>
          <h1 className="text-center text-3xl">Featured Authors</h1>
          <h3 className="text-center text-4xl">Captivates with every word</h3>
          <p className="m-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            fuga nostrum illum distinctio eum quidem recusandae soluta aliquam
            laboriosam odit quas, nam molestias fugiat culpa rem nulla iste?
            Modi, molestias. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Sunt earum possimus accusantium necessitatibus id neque soluta
            quibusdam explicabo laborum? Deserunt vel quia voluptates dicta
            incidunt illo fuga pariatur sequi error.
          </p>
          <p className="m-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            fuga nostrum illum distinctio eum quidem recusandae soluta aliquam
            laboriosam odit quas, nam molestias fugiat culpa rem nulla iste?
            Modi, molestias. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Sunt earum possimus accusantium necessitatibus id neque soluta
            quibusdam explicabo laborum? Deserunt vel quia voluptates dicta
            incidunt illo fuga pariatur sequi error.
          </p>
        </div>
        <div>
          <img
            src="https://thumbs.dreamstime.com/b/portrait-male-african-american-professional-possibly-business-executive-corporate-ceo-finance-attorney-lawyer-sales-stylish-155546880.jpg"
            alt=""
          />
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-3xl">Testimonials</h1>
        <h3 className="text-4xl">See What Others Are Saying</h3>
        <img
          className="mx-auto mt-5 rounded-full h-50 object-center"
          src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
        />
        <p>Tressa Joseph</p>
        <p className="text-justify m-5">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
          perspiciatis porro eveniet. Optio necessitatibus provident autem, quam
          qui, dicta molestiae quis quia deleniti aliquam magnam temporibus
          mollitia ex repellendus! Dicta. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Consequuntur, deserunt optio eum dolorum iure
          consectetur quia facilis porro modi placeat ea quis explicabo maxime
          voluptatum unde animi nemo aperiam quos!
        </p>
      </div>
    </>
  );
};

export default Home;
