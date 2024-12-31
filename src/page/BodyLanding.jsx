import React from "react";
import Header from "../components/Header";

import { AvatarComponent } from "./icon/AvatarComponent";
import { NavLink } from "react-router";
import { useEffect } from "react";
import "../sign/sign.css";

export default function BodyLanding() {
  useEffect(() => {
    // Create a style element
    const style = document.createElement("style");
    style.innerHTML = `
      /*.leaflet-container {
        min-height: 121px;
        width: 100%;
        border-radius: 5px;
        background: #fff !important;
      }*/
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
    <div className="containerLanding" style={{ fontSize: "18px" }}>
      <Header />
      <div className="containerElement">
        <p style={{ fontSize: "75px", textAlign: "center" }}>Bienvenue</p>
        <p style={{ fontSize: "16px", textAlign: "center" }}>
          Ce site est reservé aux membres inscrits, veuillez vous identifier
          pour continuer
        </p>
        <div className="avatarName">
          <AvatarComponent />
          <p style={{ fontSize: "18px", textAlign: "center" }}>Olivier</p>
        </div>

        <ul className="ulList">
          <li>
            <NavLink
              to="/compte"
              style={{ color: "#faa60b", textDecoration: "none" }}
            >
              Votre compte
            </NavLink>
          </li>
          <li>
            {" "}
            <p style={{ color: "#faa60b" }}>Déconnexion</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
