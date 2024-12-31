import React from "react";
import { NavLink } from "react-router";

export default function Header() {
  const url = window.location.pathname;

  return (
    <div className="containerHeaderFirst">
      <div className="containerHeader">
        <p style={{ textAlign: "center" }}>BIENVENUE OLIVIER</p>
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
