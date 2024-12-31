import React, { useEffect, useState } from "react";
import { InputComponent, InputComponent3 } from "./InputComponent";
import { BiPersonStandingDress } from "./icon/GirlPerson";
import { TopcoatEmail } from "./icon/Mail";
import { Fa6SolidKey } from "./icon/KeyIcon";
import { SubwayWorld } from "./icon/World";

import { MapContainer } from "react-leaflet";
import { LeafletControlGeocoder } from "./component/Search";
import data from "./data/countryData.json";
import ProfileDownload from "./component/ProfilDownload";
import ButtonUploadFile from "./component/ButtonUploadFile";
import ButtonUploadFile2 from "./component/ButtonUploadFile2";
import "./sign.css";
import "leaflet/dist/leaflet.css";
import { verifyPassword } from "./verifyMotsDePasse";
import { auth, db } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Toast } from "./component/Toast";
import { useNavigate } from "react-router";
import { EosIconsLoading } from "./icon/Spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [classOfEmail, setClassOfEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [classOfPassword, setClassOfPassword] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    setClassOfEmail(false);
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    setClassOfPassword(false);
  };

  const submitData = async () => {
    if (!password || !email) {
      if (!password) {
        setClassOfPassword(true);
      }
      if (!email) {
        setClassOfEmail(true);
      }
      setMessage("Tous les champ ne sont pas remplit !");
      setErr(true);
      setStartSending(() => false);
      handleShowToast();
      return;
    }
    try {
      setStartSending(() => true);
      /*  const data = {
        email,
        password,
      }; */
      const tt = await signInWithEmailAndPassword(auth, email, password);
      console.log(tt);
      setStartSending(() => false);
      setMessage("Success!");
      setErr(false);
      handleShowToast();
      navigate("/");
    } catch (error) {
      setMessage("Une erreur est survenue !");
      setErr(true);
      setStartSending(() => false);
      handleShowToast();
    }
  };

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setMessage("");
      setErr(false);
    }, 3000);
  };

  return (
    <div className="bestLogin">
      <div className="containerLogin">
        <Toast message={message} show={showToast} error={err} />
        <div className="titleLogin">Se connecter</div>

        <div className="inputWithLabel">
          <label htmlFor="email">
            {" "}
            <strong>Votre e-mail</strong>{" "}
          </label>
          <InputComponent
            val={email}
            setValue={setEmail}
            myId="email"
            icon={<TopcoatEmail width="18px" height="18px" />}
            placeholder="E-mail"
            handleChange={handleEmail}
            pass={classOfEmail}
          />
        </div>
        <div className="inputWithLabel">
          <label htmlFor="password">
            {" "}
            <strong>Mot de passe</strong>{" "}
          </label>
          <InputComponent3
            val={password}
            myId="password"
            placeholder="Mot de passe"
            icon={<Fa6SolidKey width="18px" height="18px" />}
            type="password"
            handleChange={handlePassword}
            pass={classOfPassword}
            messagePassword=""
            valid=""
          />
        </div>
        <div className="partSubmitButton">
          <button
            type="button"
            className="conButton"
            onClick={submitData}
            disabled={startSending}
          >
            <span>Se connecter</span>
            {startSending && <EosIconsLoading width="2em" height="2em" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export { Login };
