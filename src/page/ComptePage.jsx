import React, { useEffect, useState } from "react";
import { AvatarComponent } from "./icon/AvatarComponent";
import { MiniAvatar } from "./icon/MiniAvatar";
import { ParameterIcon } from "./icon/ParameterIcon";
import { MapIcon } from "./icon/MapIcon";
import { DeleteIcon } from "./icon/DeleteIcon";
import { MoreIcon } from "./icon/MoreIcon";
import { InputComponent2 } from "../sign/InputComponent";
import data from "../sign/data/countryData.json";
import { MapContainer } from "react-leaflet";
import { LeafletControlGeocoder } from "../sign/component/Search";
import Header from "../components/Header";
import "../sign/sign.css";

export default function ComptePage() {
  const [buttonState, setButtonState] = useState("compte");
  const handleButtonState = (value) => {
    setButtonState(value);
  };

  useEffect(() => {
    // Create a style element
    const style = document.createElement("style");
    style.innerHTML = `
      .leaflet-container {
        min-height: 121px;
        width: 100%;
        border-radius: 5px;
        background: #fff !important;
      }
      .leaflet-control-attribution {
        width: 0 !important;
        overflow: hidden !important;
        padding: 0 !important;
      }
      .leaflet-control-attribution a {
        text-decoration: none !important;
        color: white !important;
      }
        .leaflet-bar  {
  width: 100% !important;
  height: 121px !important;
  position: absolute;
  margin: 0 !important;
  border: 0 !important;
  
}
.leaflet-control-zoom .leaflet-bar .leaflet-control {
  display: none;
}

.leaflet-top,
.leaflet-left {
  width: 100%;
  height: 121px;
  padding: 0 !important;
  overflow: hidden !important;
}
  .leaflet-control-zoom-in {
  display: none;
}
.glass {
  padding-left: 5px;
  height: 40px;
  border: 2px solid #00000023 !important;
}
.glass:focus {
  border: 2px solid #00000067 !important;
}
  .reset {
  color: #007bff;
  width: 30px;
  height: 30px;
  font-size: 20px;
  border: 2px solid #00000057;
  background-color: #fff;
  padding: 0;
}
.leaflet-bar form {
  gap: 0;
  padding: 0 !important;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.glass {
  height: 30px;
  outline: none;
  display: inline;
  border: 2px solid #0000003d !important;
  border-radius: 5px;
  border-right: 0px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  flex: 1;
}

.leaflet-control-zoom {
}

.leaflet-bar-part {
  width: 100% !important;
  text-align: start !important;
}
.leaflet-bar-part-single {
  width: 100% !important;
}
.leaflet-bar-part .leaflet-bar-part-single {
  color: #000;
}

.leaflet-control-attribution,
.leaflet-control {
  color: rgb(238, 12, 12);
  text-decoration: none;
}

.results {
  color: #000 !important;
  overflow: auto;
  margin: 0;
  z-index: 200000;
  max-height: 90px !important;
  display: block;
  width: 100%;
}
.results div:hover {
  background-color: #000000c9;
  color: #fff;
  cursor: pointer;
}
  .leaflet-control-container:first-child:nth-child(2) {
    display: none !important; 
}
    `;
    // Append the style element to the document head
    document.head.appendChild(style);

    // Cleanup the style element when the component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="containerTop">
      <Header />
      <div className="containerCompte">
        <div className="titleCompte">
          <p className="" style={{ fontSize: "60px", textAlign: "center" }}>
            {" "}
            Votre compte
          </p>
          <p style={{ fontSize: "16px", textAlign: "center" }}>
            {" "}
            Vous pouvez sur cette page ajouter / modifier vos informations
          </p>
        </div>
        <div className="containerInfo">
          <div className="navbarInfo">
            <div className="profilCompte">
              <AvatarComponent />
              <div className="detailAvatar">
                <p style={{ fontSize: "16px" }}>Olivier</p>
                <a
                  href=""
                  style={{
                    fontSize: "12px",
                    textDecoration: "none",
                    color: "blue",
                  }}
                >
                  Voir le profil
                </a>
              </div>
            </div>
            <div className="containerPartNav">
              <div
                className="partNav"
                onClick={() => handleButtonState("compte")}
              >
                <div
                  className="miniAvatar"
                  style={{
                    color: buttonState === "compte" ? "blue" : "black",
                  }}
                >
                  <MiniAvatar />
                </div>
                <div className="oneNav">
                  {" "}
                  <p
                    style={{
                      fontWeight: buttonState === "compte" ? "900" : "",
                    }}
                  >
                    Compte
                  </p>{" "}
                  <MoreIcon />{" "}
                </div>
              </div>
              <div
                className="partNav"
                onClick={() => handleButtonState("mot de passe")}
              >
                <div
                  className="miniAvatar"
                  style={{
                    color: buttonState === "mot de passe" ? "blue" : "black",
                  }}
                >
                  <ParameterIcon />
                </div>
                <div className="oneNav">
                  {" "}
                  <p
                    style={{
                      fontWeight: buttonState === "mot de passe" ? "900" : "",
                    }}
                  >
                    Modifier le mot de passe
                  </p>{" "}
                  <MoreIcon />
                </div>
              </div>

              <div
                className="partNav"
                onClick={() => handleButtonState("carte")}
              >
                <div
                  className="miniAvatar"
                  style={{
                    color: buttonState === "carte" ? "blue" : "black",
                  }}
                >
                  <MapIcon />
                </div>
                <div className="oneNav">
                  {" "}
                  <p
                    style={{
                      fontWeight: buttonState === "carte" ? "900" : "",
                    }}
                  >
                    Paramètre carte
                  </p>{" "}
                  <MoreIcon />
                </div>
              </div>

              <div
                className="partNav"
                onClick={() => handleButtonState("supprimer")}
              >
                <div
                  className="miniAvatar"
                  style={{
                    color: buttonState === "supprimer" ? "blue" : "black",
                  }}
                >
                  <DeleteIcon />
                </div>
                <div className="oneNav">
                  {" "}
                  <p
                    style={{
                      fontWeight: buttonState === "supprimer" ? "900" : "",
                    }}
                  >
                    Supprimer le compte
                  </p>{" "}
                  <MoreIcon />{" "}
                </div>
              </div>
            </div>
          </div>

          {buttonState === "compte" ? (
            <Compte />
          ) : buttonState === "mot de passe" ? (
            <ModifMotsDepasse />
          ) : buttonState === "carte" ? (
            <ParametreCarte />
          ) : (
            <SupprimerCompte />
          )}
        </div>
      </div>
    </div>
  );
}

export function ModifMotsDepasse() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="info">
      <div className="infoIdent">
        <div className="ident">
          <div className="ident1">
            <MiniAvatar />
            <p>Compte</p>
          </div>
          <p>identifiant</p>
        </div>
        <p style={{ textAlign: "start", paddingLeft: "5px" }}>Olivierorna</p>
      </div>

      <div className="formData">
        <div className="inputWithLabel">
          <label htmlFor="password">
            {" "}
            <strong>Mot de passe</strong>{" "}
          </label>
          <InputComponent2
            val={password}
            setValue={setPassword}
            myId="password"
            placeholder="Mot de passe"
            type="password"
          />
        </div>

        <div className="inputWithLabel">
          <label htmlFor="confirmPassword">
            {" "}
            <strong>Confirmer le mot de passe</strong>{" "}
          </label>
          <InputComponent2
            val={confirmPassword}
            setValue={setConfirmPassword}
            myId="confirmPassword"
            placeholder="Confirmer le mot de passe"
            type="password"
          />
        </div>
      </div>

      <div className="partSubmitButton">
        <button className="inscButton"> Mettre à jour le mot de passe </button>
      </div>
    </div>
  );
}

export function ParametreCarte() {
  return (
    <div className="info">
      <div className="infoIdent">
        <div className="ident">
          <div className="ident1">
            <MiniAvatar />
            <p>Compte</p>
          </div>
          <p>identifiant</p>
        </div>
        <p style={{ textAlign: "start", paddingLeft: "5px" }}>Olivierorna</p>
      </div>

      <div className="formData"></div>

      {/* <div className="partSubmitButton">
      <button className="inscButton" disabled={!selectValue}>
        {" "}
        Mettre à jour le mot de passe{" "}
      </button>
    </div> */}
    </div>
  );
}

export function SupprimerCompte() {
  return (
    <div className="info">
      <div className="infoIdent">
        <div className="ident">
          <div className="ident1">
            <MiniAvatar />
            <p>Compte</p>
          </div>
          <p>identifiant</p>
        </div>
        <p style={{ textAlign: "start", paddingLeft: "5px" }}>Olivierorna</p>
      </div>

      <div className="formData"></div>
      <h1>
        <strong>Votre Compte a été supprimer</strong>{" "}
      </h1>
      {/* <div className="partSubmitButton">
    <button className="inscButton" disabled={!selectValue}>
      {" "}
      Mettre à jour le mot de passe{" "}
    </button>
  </div> */}
    </div>
  );
}

export function Compte() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [biographie, setBiographie] = useState("");
  const [pays, setPays] = useState("France");
  const [ville, setville] = useState({});
  const [selectValue, setSelectValue] = useState(true);
  const [selected, setSelected] = useState(1);
  const handlePays = (e) => {
    e.preventDefault();
    setPays(e.target.value);
  };
  const handleBiographie = (e) => {
    e.preventDefault();
    setBiographie(e.target.value);
  };

  return (
    <div className="info">
      <div className="infoIdent">
        <div className="ident">
          <div className="ident1">
            <MiniAvatar />
            <p>Compte</p>
          </div>
          <p>identifiant</p>
        </div>
        <p style={{ textAlign: "start", paddingLeft: "5px" }}>Olivierorna</p>
      </div>

      <div className="formData">
        <div className="inputWithLabel">
          <label htmlFor="prenom">
            {" "}
            <strong>Prénom</strong>{" "}
          </label>
          <InputComponent2
            val={prenom}
            setValue={setPrenom}
            myId="prenom"
            placeholder="Prenom"
          />
        </div>

        <div className="inputWithLabel">
          <label htmlFor="nom">
            {" "}
            <strong>Nom</strong>{" "}
          </label>
          <InputComponent2
            val={nom}
            setValue={setNom}
            myId="nom"
            placeholder="Nom"
          />
        </div>
        <div className="inputWithLabel">
          <label htmlFor="email">
            {" "}
            <strong>Adresse e-mail</strong>{" "}
          </label>
          <InputComponent2
            val={email}
            setValue={setEmail}
            myId="email"
            placeholder="E-mail"
          />
        </div>

        <div className="inputWithLabel">
          <label htmlFor="biographie">
            {" "}
            <strong>Biographie</strong>{" "}
          </label>
          <textarea
            name=""
            id="biographie"
            value={biographie}
            className="inputInsc2"
            rows={3}
            onChange={handleBiographie}
          />
        </div>

        <div className="inputWithLabel">
          <label htmlFor="selectCountry">
            {" "}
            <strong>Pays</strong>{" "}
          </label>

          <div className="containerInput">
            <select
              name="countyPosition"
              id="selectCountry"
              placeholder="France"
              className="inputInsc2"
              style={{ padding: "5px" }}
              value={pays}
              onChange={handlePays}
            >
              {data.map((value, index) => (
                <option key={index} value={value.country}>
                  {" "}
                  {value.country}{" "}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="inputWithLabel">
          <label htmlFor="">
            {" "}
            <strong>Ville</strong>{" "}
          </label>

          <MapContainer
            center={[48.8566, 2.3522]}
            zoom={13}
            zoomControl={false}
          >
            <LeafletControlGeocoder ville={ville} setVille={setville} />
          </MapContainer>
        </div>
      </div>

      <div className="partSubmitButton1">
        <button className="inscButton" disabled={!selectValue}>
          {" "}
          Mettre à jour le compte{" "}
        </button>
      </div>
    </div>
  );
}