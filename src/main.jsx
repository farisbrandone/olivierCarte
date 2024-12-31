import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { Signup } from "./sign/Signup.jsx";
import BodyLanding from "./page/BodyLanding.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import ComptePage from "./page/ComptePage.jsx";
import "./index.css";
import LoginMother from "./sign/LoginMother.jsx";
import { Login } from "./sign/Login.jsx";
import Contacter from "./page/Contacter.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LoginMother>
              <BodyLanding />{" "}
            </LoginMother>
          }
        />
        <Route
          path="/compte"
          element={
            <LoginMother>
              {" "}
              <ComptePage />
            </LoginMother>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/carteinteractive"
          element={
            <LoginMother>
              {" "}
              <App />
            </LoginMother>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/contacter/:userId/:senderId" element={<Contacter />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
