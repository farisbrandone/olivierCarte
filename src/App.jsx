import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useState } from "react";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet-control-geocoder";

import Header from "./components/Header";
import Footer from "./components/Footer";
/* import { LeafletControlGeocoder } from "./sign/component/Search";
import { LeafletControlSearch } from "./sign/component/SearchForMap"; */
import { OpenStreetMapProvider, SearchControl } from "leaflet-geosearch";
import {
  FocusView,
  Geolocalisation,
  MinimapControl,
} from "./sign/component/MiniMap";
import { BiPersonStandingDress } from "./sign/icon/GirlPerson";
import { OiPerson } from "./sign/icon/Person";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
//import "leaflet-geosearch/dist/geosearch.css";
function App() {
  const [userArray, setUserArray] = useState(null);
  const [sender, setSender] = useState(null);
  const [a, setA] = useState(2);
  const currentUser = auth.currentUser;
  //const map = useMap();
  const setLeafletMapRef = (map) => {
    if (!!map) {
      map.addControl(searchControl);
    }
  };

  const myfunction = useCallback(setLeafletMapRef, [a]);

  /*  const markers = [
    {
      geocode: [48.86, 2.3522],
      popup: "hello, I am pop up 1",
    },
    {
      geocode: [48.85, 2.3522],
      popup: "hello, I am pop up 2",
    },
    {
      geocode: [48.855, 2.34],
      popup: "hello, I am pop up 3",
    },
  ]; */

  const custumIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38], //size of icon
    //iconUrl:require("./img/marker-icon.png")
  });
  /* const creaCustumClusterIcon = (cluster) => {
    return new divIcon({
      html: ` <div class="cluster-icon" > ${cluster.getChildCount()} </div>`,
        className: "custom-marker-cluster",
      iconSize: point(33, 33, true), 
    });
  }; */

  const searchControl = new SearchControl({
    provider: new OpenStreetMapProvider(),
    showMarker: false,
    autoClose: true,
    searchLabel: "Entrer une ville",
  });

  useEffect(() => {
    // Create a style element
    const style = document.createElement("style");
    style.innerHTML = `
      .leaflet-container {
  width: 95vw;
  border-radius: 15px;
  height: 800px;
}
  /*.leaflet-control-geocoder-icon {
        background-color: #f8e71c; /* Couleur de fond du bouton */
        border: 2px solid #e0c92b; /* Bordure du bouton */
        border-radius: 10px; /* Coins arrondis du bouton */
        width: 30px; /* Largeur du bouton */
        height: 30px; /* Hauteur du bouton */
        text-align: center; /* Centrage du texte dans le bouton */
        line-height: 30px; /* Centrage vertical du texte */
        color: #000; /* Couleur du texte dans le bouton */
        font-weight: bold; /* Gras pour un aspect plus visible */
        cursor: pointer; /* Curseur pointer au survol du bouton */
      }
     .leaflet-control-geocoder a, .leaflet-control-geocoder .leaflet-control-geocoder-icon {
    border-bottom: none;
    display: inline-block;
}*/`;
    // Append the style element to the document head
    document.head.appendChild(style);
    const affectStyle = async () => {
      const style2 = await import("leaflet-geosearch/dist/geosearch.css");
      style.innerHTML = style.innerHTML + style2;
    };
    affectStyle();
    // Cleanup the style element when the component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
        setUserArray([...userData]);
        setSender(userData.find((us) => us.email === currentUser.email));
      }
    };
    getAllMember();
  }, []);

  return (
    <div className="myBody">
      <Header />
      <div className="titleCarte">
        <p style={{ fontSize: "45px", textAlign: "center" }}>
          Bienvenue sur la carte interactive de Christ Consolateur
        </p>
        <p style={{ fontSize: "16px", textAlign: "center" }}>
          Cette carte a pour objectif de permettre de vous connecter avec des
          livres de David Théry qui habitent près de chez vous
        </p>
      </div>
      <MapContainer center={[46.6034, 1.8883]} zoom={2} ref={myfunction}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          /*  iconCreateFunction={creaCustumClusterIcon} */
        >
          <div></div>

          {userArray &&
            userArray.map((value) => {
              return (
                value.ville.lat && (
                  <Marker
                    position={[value.ville.lat, value.ville.lon]}
                    icon={custumIcon}
                  >
                    <Popup>
                      <div className="popupContainer">
                        <p className="topText">il ya 1 membre</p>
                        <div className="bodyPopup">
                          {value.image && value.image.publication ? (
                            <img
                              src={value.image.photo}
                              alt=""
                              className="imageCarte"
                            />
                          ) : (
                            <div className="popupImage">
                              <BiPersonStandingDress width="3em" height="3em" />{" "}
                            </div>
                          )}
                          <div className="bodyDescription">
                            <span className="popupName">
                              {" "}
                              <strong>{value.prenom}</strong>{" "}
                            </span>
                            <span className="popupName1">
                              {" "}
                              <strong>
                                {value.genre}-{value.ville.label}
                              </strong>{" "}
                            </span>
                            <span className="popupDescription">
                              {value.description}
                            </span>
                          </div>
                        </div>
                        <a
                          href={`/contacter/${value.id}/${sender.id}`}
                          className="popupContact"
                        >
                          {" "}
                          Contactez {value.prenom}{" "}
                        </a>
                      </div>
                    </Popup>
                  </Marker>
                )
              );
            })}

          {/*  {markers.map((marker) => (
            <Marker position={marker.geocode} icon={custumIcon}>
              <Popup>
                <div className="popupContainer">
                  <p className="topText">il ya 1 membre</p>
                  <div className="bodyPopup">
                    {false ? (
                      <img src="" alt="" />
                    ) : (
                      <div className="popupImage">
                        <OiPerson width="3em" height="3em" />{" "}
                      </div>
                    )}
                    <div className="bodyDescription">
                      <span className="popupName">
                        {" "}
                        <strong>Name</strong>{" "}
                      </span>
                      <span className="popupName">
                        {" "}
                        <strong>Sexe-Ville</strong>{" "}
                      </span>
                      <span className="popupDescription">
                        Bonkour, j'ai 34 ans et une merveilleuse femme j'aspire
                        à vivre et marcher par l'esprit. Soyez bénis!
                      </span>
                    </div>
                  </div>
                  <a className="popupContact"> Contactez Name </a>
                </div>
              </Popup>
            </Marker>
          ))} */}
        </MarkerClusterGroup>
        {/*  <LeafletControlSearch /> */}
        <MinimapControl position="bottomright" />
        <Geolocalisation user={sender} />
        <FocusView />
      </MapContainer>

      <Footer />
    </div>
  );
}

export default App;
