import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Authprovider } from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="43625608670-a3a41d7m9f65th9su5mdv5h938vtpqae.apps.googleusercontent.com">
      <BrowserRouter>
        <Authprovider>
          <App />
        </Authprovider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
