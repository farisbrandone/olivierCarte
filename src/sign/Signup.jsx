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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Toast } from "./component/Toast";
import { useNavigate } from "react-router";
import { createUser } from "./createUser";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { EosIconsLoading } from "./icon/Spinner";

function Signup() {
  const [prenom, setPrenom] = useState("");
  const [classOfPrenom, setClassOfPrenom] = useState(false);
  const [nom, setNom] = useState("");
  const [classOfNom, setClassOfNom] = useState(false);
  const [genre, setGenre] = useState("Homme");
  const [email, setEmail] = useState("");
  const [classOfEmail, setClassOfEmail] = useState(false);
  const [description, setDescription] = useState("");
  const [classOfDescription, setClassOfDescription] = useState(false);
  const [selectValue, setSelectValue] = useState(true);
  const [password, setPassword] = useState("");
  const [classOfPassword, setClassOfPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [classOfConfirmPassword, setClassOfConfirmPassword] = useState(false);
  const [selected, setSelected] = useState(1);
  const [pays, setPays] = useState("France");
  const [classOfPays, setClassOfPays] = useState(false);
  const [ville, setville] = useState({});
  const [classOfVille, setClassOfVille] = useState(false);
  const [image, setImage] = useState({ photo: "", publication: true });
  const [statePhoto1, setStatePhoto1] = useState(false);
  const [statePhoto2, setStatePhoto2] = useState(false);
  const [statePhoto3, setStatePhoto3] = useState(false);
  const [messagePassword, setMessagePassword] = useState("");
  const [valid, setValid] = useState("");
  const [startSending, setStartSending] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState(false);
  const [messageError, setMessageError] = useState("");

  const navigate = useNavigate();

  const handlePrenom = (e) => {
    e.preventDefault();
    setPrenom(e.target.value);
    setClassOfPrenom(false);
    setMessageError("");
  };

  const handleNom = (e) => {
    e.preventDefault();
    setNom(e.target.value);
    setClassOfNom(false);
    setMessageError("");
  };

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    setClassOfEmail(false);
    setMessageError("");
  };

  const handleGenre1 = (e) => {
    e.preventDefault();
    setGenre("Homme");
    setSelected(1);
    setMessageError("");
  };

  const handleGenre2 = (e) => {
    e.preventDefault();
    setGenre("Femme");
    setSelected(2);
    setMessageError("");
  };

  const handlePays = (e) => {
    e.preventDefault();
    setPays(e.target.value);
    setClassOfPays(false);
    setMessageError("");
  };

  const handleAcceptRule = (e) => {
    e.persist();
    setSelectValue(e.target.checked);
    setMessageError("");
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
    setClassOfDescription(false);
    setMessageError("");
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    if (!verifyPassword(e.target.value).success) {
      setClassOfPassword(false);
      setMessagePassword(verifyPassword(e.target.value).message);
      return;
    }
    setValid("Mots de passe valide");
    setClassOfPassword(false);
    setMessagePassword("");
    setMessageError("");
  };

  const handleConfirmPassword = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
    setClassOfConfirmPassword(false);
    setMessageError("");
  };

  const submitData = async () => {
    if (
      !prenom ||
      !nom ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword ||
      !email ||
      !ville ||
      !genre ||
      !description
    ) {
      if (!nom) {
        setClassOfNom(true);
      }
      if (!prenom) {
        setClassOfPrenom(true);
      }
      if (!password || !verifyPassword(password).success) {
        setClassOfPassword(true);
        setMessagePassword(verifyPassword(motsDepasse).message);
      }
      if (!confirmPassword || password !== confirmPassword) {
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
      console.log("packo");
      const data = {
        prenom,
        nom,
        genre,
        email,
        password,
        pays,
        ville,
        image,
        description,
      };

      const messageRef = collection(db, "OlivierUserData");
      let existFireStore = false;
      const dateOfCreation = new Date().toUTCString();
      const dateOfUpdate = new Date().toUTCString();
      const resultCreate = await createUser(email, password, auth);
      if (resultCreate.alreadyExist) {
        const querySnapshot = await getDocs(messageRef);

        if (querySnapshot.docs.length !== 0) {
          querySnapshot.forEach((doc) => {
            const id = doc.id;
            if (doc.data().email === email) {
              existFireStore = true;
            }
          });
        }
        if (existFireStore) {
          setMessageError("Vous êtes déja inscrit comme utilisateur");
          return;
        }
      }
      await setDoc(doc(messageRef), {
        prenom,
        nom,
        genre,
        email,
        password,
        pays,
        ville,
        image,
        description,
        dateOfCreation,
        dateOfUpdate,
      });
      setStartSending(() => false);
      setMessage("Success!");
      setErr(false);
      handleShowToast();
      navigate("/login");
    } catch (error) {
      console.log(error);
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
    }, 3000); // Hide the toast after 3 seconds
  };

  useEffect(() => {
    // Create a style element
    const style = document.createElement("style");
    style.innerHTML = `
      .leaflet-container {
       /* min-height: 121px;*/
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
    <div className="bigInsc">
      <div className="containerInsc">
        {messageError && <p className="message2"> {messageError} </p>}
        <Toast message={message} show={showToast} error={err} />
        <div className="titleinsc">Je me présente</div>
        <div className="containerInput">
          <div className="caseIcon">
            {" "}
            <BiPersonStandingDress width="18px" height="18px" />{" "}
          </div>
          <input
            type="text"
            placeholder="Prenom"
            className="inputInsc"
            value={prenom}
            onChange={handlePrenom}
            style={{ borderColor: classOfPrenom && "red" }}
          />
        </div>

        <div className="containerInput">
          <div className="caseIcon">
            <BiPersonStandingDress width="18px" height="18px" />
          </div>
          <input
            type="text"
            placeholder="Nom"
            className="inputInsc"
            value={nom}
            onChange={handleNom}
            style={{ borderColor: classOfNom && "red" }}
          />
        </div>

        <p>
          <strong>Je suis un(e)</strong>{" "}
        </p>
        <div className="containerRadio">
          <div className="radioElelement">
            <input
              type="radio"
              name="radio"
              id="radio1"
              value="Homme"
              onChange={handleGenre1}
              checked={selected === 1}
            />
            <label htmlFor="radio1">Homme</label>
          </div>

          <div className="radioElelement">
            <input
              name="radio"
              type="radio"
              id="radio2"
              value={"Femme"}
              onChange={handleGenre2}
              checked={selected === 2}
            />
            <label htmlFor="radio2">Femme</label>
          </div>
        </div>
        <p>
          <strong>
            Je me présente en quelques mots (cette présentation sera visible sur
            la carte par tous les utilisateurs)
          </strong>{" "}
        </p>
        <textarea
          name="textPresentation"
          id=""
          placeholder="Parlez nous un peu de vous"
          rows={4}
          className="textPresentation"
          value={description}
          onChange={handleDescription}
          style={{ borderColor: classOfDescription && "red" }}
        />
        <p className="textAddPhoto">
          <strong>J'ajoute ma photo</strong>{" "}
        </p>
        <div className="consignePhoto">
          {/*  <div className="textPhoto">
          <span>{">"}</span> <p>Télécharger ma photo</p>
        </div>

        <div className="textPhoto">
          <span>{">"}</span> <p>Prendre une photo</p>
        </div>
        <div className="textPhoto">
          <span>{">"}</span> <p>Ne souhaite pas publier ma photo</p>
        </div> */}

          <ButtonUploadFile
            name="file1"
            valueForHtml="drop-zone-1"
            setImageUrl={setImage}
            statePhoto1={statePhoto1}
            setStatePhoto1={setStatePhoto1}
            setStatePhoto2={setStatePhoto2}
            setStatePhoto3={setStatePhoto3}
          />
          <ProfileDownload
            setImage={setImage}
            statePhoto2={statePhoto2}
            setStatePhoto1={setStatePhoto1}
            setStatePhoto2={setStatePhoto2}
            setStatePhoto3={setStatePhoto3}
          />
          <ButtonUploadFile2
            name="file2"
            valueForHtml="drop-zone-2"
            setImageUrl={setImage}
            statePhoto3={statePhoto3}
            setStatePhoto1={setStatePhoto1}
            setStatePhoto2={setStatePhoto2}
            setStatePhoto3={setStatePhoto3}
          />
        </div>

        <div
          className="titleinsc"
          style={{ marginBottom: "0px", marginTop: "15px" }}
        >
          Identifiants
        </div>

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
            messagePassword={messagePassword}
            valid={valid}
          />
        </div>

        <div className="inputWithLabel">
          <label htmlFor="confirmPassword">
            {" "}
            <strong>Confirmer le mot de passe</strong>{" "}
          </label>
          <InputComponent
            val={confirmPassword}
            setValue={setConfirmPassword}
            myId="confirmPassword"
            placeholder="Confirmer le mot de passe"
            icon={<Fa6SolidKey width="18px" height="18px" />}
            type="password"
            handleChange={handleConfirmPassword}
            pass={classOfConfirmPassword}
          />
        </div>
        <div
          className="titleinsc"
          style={{ marginBottom: "0px", marginTop: "15px" }}
        >
          Ma position sur la carte
        </div>
        <div className="inputWithLabel">
          <label htmlFor="selectCountry">Pays</label>

          <div className="containerInput">
            <div className="caseIcon">
              {" "}
              <SubwayWorld width="18px" height="18px" />{" "}
            </div>
            <select
              name="countyPosition"
              id="selectCountry"
              placeholder="France"
              className="inputInsc"
              style={{ padding: "5px", borderColor: classOfPays && "red" }}
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

        <p className="labelVille">
          Saisissez votre ville puis choisissez parmi les suggestions proposées
          celle qui vous correspond
        </p>
        <MapContainer center={[48.8566, 2.3522]} zoom={13} zoomControl={false}>
          <LeafletControlGeocoder ville={ville} setVille={setville} />
        </MapContainer>

        <div className="partSubmit">
          <img src="carte.png" alt="" className="imageCarte1" />

          <div className="selectRule">
            <input
              id="rule"
              type="checkbox"
              checked={selectValue}
              onChange={handleAcceptRule}
            />
            <label htmlFor="rule">Oui</label>
          </div>
          <p className="ruleParagraphe">
            En cochant oui, vous acceptez d'apparaitre sur la carte. Votre
            prénom et votre présentation seront affichés, mais pas votre email.
            Les autres utilisateurs pourront vous contacter via un formulaire de
            contact que vous recevrez par email et vous pourrez ou non décider
            de leur répondre.
          </p>
          <div className="partSubmitButton">
            <button
              type="button"
              className="inscButton"
              disabled={!selectValue || startSending}
              onClick={submitData}
            >
              <span>S'inscrire</span>
              {startSending && <EosIconsLoading width="2em" height="2em" />}
            </button>
            <button
              type="button"
              className="conButton"
              onClick={() => navigate("/login")}
            >
              Connexion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Signup };
