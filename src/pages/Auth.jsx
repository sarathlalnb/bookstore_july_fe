import React, { useContext, useState } from "react";
import styles from "./Auth.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

// Returns a function that lets you navigate programmatically in the browser in response to user interactions or effects.
import { Link, useNavigate } from "react-router-dom";
import { googleLoginAPI, loginUser, registerUser } from "../services/AllApi";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { authContext } from "../context/authContext";

const Auth = ({ insideRegister }) => {
  const navigate = useNavigate();

  const { saveToken } = useContext(authContext);

  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    email: "",
  });

  const onRegisterClick = async () => {
    try {
      if (
        userData.userName == "" ||
        userData.password == "" ||
        userData.email == ""
      ) {
        toast.error("Please Fill The form");
      } else {
        let apiResponse = await registerUser(userData);
        if (apiResponse.status == 201) {
          toast.success("successfully registered");
          navigate("/login");
        } else {
          toast.error(apiResponse.response.data.message);
        }
      }
    } catch (error) {
      toast.error("Something went Wrong");
    }
  };

  const onLoginClick = async () => {
    try {
      let reqBody = {
        email: userData.email,
        password: userData.password,
      };

      let apiResponse = await loginUser(reqBody);
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        toast.success("Login Success");

        saveToken(apiResponse.data.token);

        // localStorage.setItem("token", apiResponse.data.token);

        if (apiResponse.data.existingUser.userType == "admin") {
          navigate("/admin-home");
        } else {
          navigate("/");
        }
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      toast.error("Something went Wrong");
      console.log(error);
    }
  };

  const decodeFn = async (credentials) => {
    console.log(credentials);

    let decodedData = jwtDecode(credentials.credential);
    console.log(decodedData);

    let payload = {
      userName: decodedData.name,
      email: decodedData.email,
      proPic: decodedData.picture,
    };

    let apiResponse = await googleLoginAPI(payload);
    console.log(apiResponse);
    if (apiResponse.status == 200 || apiResponse.status == 201) {
      toast.success(apiResponse.data.message);
      saveToken(apiResponse.data.token);
      // localStorage.setItem("token", apiResponse.data.token);
      navigate("/");
    } else {
      toast.error(apiResponse.response.data.message);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.overlayWrapper}>
        <h1 className={styles.overlayHeading}>BOOK STORE</h1>
        <div className={styles.boxOverlay}>
          <div className={styles.iconWrapper}>
            <FaRegUserCircle className={styles.icon} />
          </div>

          <>
            <div className={styles.loginTitle}>
              {insideRegister ? "Register" : "Login"}
            </div>
            <div className={styles.loginForm}>
              {insideRegister && (
                <input
                  onChange={(e) =>
                    setUserData({ ...userData, userName: e.target.value })
                  }
                  type="text"
                  placeholder="User Name"
                  className={styles.inputField}
                />
              )}

              <input
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                type="text"
                placeholder="EmailId"
                className={styles.inputField}
              />
              <input
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                type="password"
                placeholder="password"
                className={styles.inputField}
              />
              <div className={styles.sub}>
                <span className={styles.span1}>
                  Never share your password with others
                </span>
                <span className={styles.span2}>
                  <a href="">forgot password</a>
                </span>
              </div>
              <div>
                {insideRegister ? (
                  <button onClick={onRegisterClick} className={styles.btn1}>
                    Register
                  </button>
                ) : (
                  <button onClick={onLoginClick} className={styles.btn1}>
                    Login
                  </button>
                )}
              </div>
            </div>
            <span>------------------------or--------------------------</span>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                decodeFn(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />

            {insideRegister ? (
              <div className={styles.register}>
                <span>Already an Existing User ?</span>
                <button>
                  <Link to="/login">Login</Link>
                </button>
              </div>
            ) : (
              <div className={styles.register}>
                <span>Are you a new user ?</span>
                <button>
                  <Link to="/Register">Register</Link>
                </button>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Auth;
