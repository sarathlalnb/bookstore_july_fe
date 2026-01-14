import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faGrinStars } from "@fortawesome/free-solid-svg-icons/faGrinStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem } from "flowbite-react";
import { authContext } from "../context/authContext";

const Header = () => {
  const [isLoggedIn, setIsLoggendIn] = useState(false);

  const navigate = useNavigate();

  const {removeToken} = useContext(authContext)

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggendIn(true);
    }
  }, []);

  const onLogoutClick = () => {
    // localStorage.clear();
    removeToken()
    navigate("/");
  };

  return (
    <>
      <div className=" flex justify-between items-center">
        <img
          className="w-25"
          src="https://images.rawpixel.com/image_png_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTEyL3Jhd3BpeGVsb2ZmaWNlOV9yZXRyb19sb2dvX2Ffb3Blbl9ib29rX2JsYWNrX2FuZF93aGl0ZV9ub19zcGxhc180YjJlZGVmOC1lMWQwLTRiNzUtODhhMi1hZWY4N2JiZjlkN2IucG5n.png"
          alt=""
        />

        <h1 className="text-3xl font-bold">Book Store</h1>

        <div className="flex items-center">
          <span>
            <FontAwesomeIcon icon={faInstagram} />
          </span>
          <span>
            <FontAwesomeIcon icon={faXTwitter} />
          </span>
          <span>
            <FontAwesomeIcon icon={faFacebook} />
          </span>

          {isLoggedIn ? (
            <div>
              {" "}
              <Dropdown
                className="text-black"
                label={
                  <div>
                    <img
                      className="w-10"
                      src="https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg?semt=ais_hybrid&w=740&q=80"
                      alt=""
                    />
                  </div>
                }
                dismissOnClick={false}
              >
                <div className="p-2">
                  <Link className="text-black" to={"/profile"}>Profile</Link>
                </div>
                <div>
                  <button className="cursor-pointer text-black" onClick={onLogoutClick}>
                    Logout
                  </button>
                </div>
              </Dropdown>
            </div>
          ) : (
            <Link to={"/login"}>
              <button className="border rounded-3xl font-bold hover:bg-black hover:text-white m-2 p-3">
                <span>
                  <FontAwesomeIcon icon={faUser} />
                </span>{" "}
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="bg-black text-white flex justify-center items-center gap-5 h-10 text-xl">
        <Link to={"/"}>Home</Link>
        <Link to={"/books"}>Books</Link>
        <Link to={'/careers'}>Career</Link>
        <Link>Contact</Link>
      </div>
    </>
  );
};

export default Header;
