import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "../sign/sign.css";
import { EosIconsLoading } from "../sign/icon/Spinner";
import axios from "axios";
import Header from "../components/Header";

export default function Contacter() {
  const [user, setUser] = useState(null);
  const [sender, setSender] = useState(null);
  const [loadingFail, setLoadingFail] = useState(false);
  const [message, setMessage] = useState("");
  const [successSending, setSuccessSending] = useState("");
  const [startSending, setStartSending] = useState(false);
  const { userId, senderId } = useParams();
  const [loading, setLoading] = useState(false);

  const handleMessage = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
    setSuccessSending("");
  };

  const sendContactMessage = async () => {
    if (!message) {
      setSuccessSending("Le champ requis n'est pas remplis");
      return;
    }
    try {
      setStartSending(true);
      setSuccessSending("");

      const data = {
        message,
        senderEmail: sender.email,
        receiverEmail: user.email,
        senderPrenom: sender.prenom,
        receiverPrenom: user.prenom,
      };
      /* const sendNotification = await axios.post(
        "https://serverbackofficetrucdejesus.onrender.com/api/frontoffice/oliviercarte",
        data
      ); */
      if (false) {
        console.log(sendNotification);
      }

      setStartSending(false);
      setSuccessSending("VOTRE MESSAGE A ÉTÉ ENVOYÉ!");
    } catch (error) {
      setStartSending(false);
      setSuccessSending(
        "ECHEC DE L'ENVOIE DU MESSAGE, VÉRIFIER VOTRE CONNEXION ET REESSAYEZ!"
      );
    }
  };

  useEffect(() => {
    const getAllMember = async () => {
      try {
        const docRef = doc(db, "OlivierUserData", userId);
        const docRef2 = doc(db, "OlivierUserData", senderId);
        const docSnap = await getDoc(docRef);
        const docSnap2 = await getDoc(docRef2);
        if (docSnap.exists() && docSnap2.exists()) {
          setUser({ ...docSnap.data() });
          setSender({ ...docSnap2.data() });
        } else {
          throw new Error("Une erreur est survenue, vérifier votre connexion");
        }
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllMember();
  }, []);
  if (loadingFail) {
    return (
      <div className="failError">
        Une erreur est survenue pendant le chargement ou problème de connexion
      </div>
    );
  }

  return (
    <div className="contactBigger">
      <Header />
      <div className="contacterContainer">
        {successSending && successSending === "VOTRE MESSAGE A ÉTÉ ENVOYÉ!" && (
          <p className="message1"> {successSending} </p>
        )}
        {successSending &&
          (successSending ===
            "ECHEC DE L'ENVOIE DU MESSAGE, VÉRIFIER VOTRE CONNEXION ET REESSAYEZ!" ||
            successSending === "Le champ requis n'est pas remplis") && (
            <p className="message2"> {successSending} </p>
          )}
        <div className="textContact">
          <h1
            style={{
              fontSize: "18px",
              marginTop: "30px",
              marginBottom: "10px",
            }}
          >
            VOUS SOUHAITEZ CONTACTER {user && user.prenom.toUpperCase()}{" "}
          </h1>
          <p style={{ fontSize: "16px" }}>
            Vous pouvez vous présenter, proposer à la personne d'échanger avec
            vous, de discuter au téléphone ou de vous rencontrer.
          </p>
          <br />
          <p style={{ fontSize: "16px" }}>
            Si la personne accepte de vous répondre, vous recevrez son message
            par email et pourrez ensuite continuez à échanger directement par
            email ou le moyen de votre choix
          </p>
          <br />
          <p style={{ fontSize: "16px", marginBottom: "30px" }}>
            Que dieu bénisse cette connection
          </p>
        </div>
        <textarea
          name=""
          id=""
          placeholder="Entrez ici votre message(Requis)"
          className="contectTextArea"
          rows={5}
          value={message}
          onChange={handleMessage}
        ></textarea>

        <button className="submitContact" onClick={sendContactMessage}>
          <span>Envoyer</span>
          {startSending && <EosIconsLoading width="2em" height="2em" />}
        </button>
      </div>
    </div>
  );
}
