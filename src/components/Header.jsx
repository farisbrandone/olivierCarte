import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";

export default function Header() {
  const url = window.location.pathname;
  const [sender, setSender] = useState(null);
  const currentUser = auth.currentUser;
  console.log(currentUser.email);
  console.log(sender);
  useEffect(() => {
    const getAllMember = async () => {
      let userData = [];
      const messageRef = collection(db, "OlivierUserData");
      const querySnapshot = await getDocs(messageRef);

      if (querySnapshot.docs.length !== 0) {
        querySnapshot.forEach((doc) => {
          const id = doc.id;
          userData.push({
            id,
            ...doc.data(),
          });
        });

        setSender(userData.find((us) => us.email === currentUser.email));
      }
    };
    getAllMember();
  }, []);
  return (
    <div className="containerHeaderFirst">
      <div className="containerHeader">
        <p style={{ textAlign: "center" }}>
          BIENVENUE {sender && sender.prenom.toUpperCase()}
        </p>
        <a
          href={"/carteinteractive"}
          style={{
            color: url === "/carteinteractive" ? "#faa60b" : "#000",
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          CARTE INTERACTIVE
        </a>
        <a
          href="/compte"
          style={{
            color: url === "/compte" ? "#faa60b" : "#000",
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          VOTRE COMPTE
        </a>
      </div>
    </div>
  );
}
