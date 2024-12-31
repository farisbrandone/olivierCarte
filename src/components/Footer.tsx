import React from "react";

export default function Footer() {
  return (
    <div className="containerFooter">
      <h1 className="footerTitle">Comment cela fonctionne?</h1>
      <div className="footerDescription">
        <div className="footerElement">
          <img src="" alt="" className="footerImage" />
          <div className="textDescription">
            <h1>
              {" "}
              <strong>Les marqueurs</strong>{" "}
            </h1>
            <p>
              En cliquant sur un marqueur, vous affichez la liste de tous les
              utilisateurs qui habitent dans cette ville.
              <br />
              Vous pouvez ensuite contacter une personne en particulier qui
              recevra votre message par mail.
            </p>
          </div>
        </div>
        <div className="footerElement">
          <img src="" alt="" className="footerImage" />
          <div className="textDescription">
            <h1>
              {" "}
              <strong>La recherche</strong>{" "}
            </h1>
            <p>
              Vous pouvez effectuer une recherche sur la carte, que cela soit un
              pays, une ville ou un lieu en particulier.
              <br />
              Au fur et à mesure que vous taper votre recherche, la carte vous
              donnera des propositions. Une fois la proposition choisie, la
              carte s'animera et un marqueur sera afficher à la position désirée
            </p>
          </div>
        </div>

        <div className="footerElement">
          <img src="" alt="" className="footerImage" />
          <div className="textDescription">
            <h1>
              {" "}
              <strong>La mini map</strong>{" "}
            </h1>
            <p>
              Cette petite carte se situe dans le coin en bas à droite
              <br />
              Elle affichera la carte principale avec un décalage de zoom qui
              vous permettra de vous déplacer plus vite sur la mappemonde
            </p>
          </div>
        </div>

        <div className="footerElement">
          <img src="" alt="" className="footerImage" />
          <div className="textDescription">
            <h1>
              {" "}
              <strong>Le Zoom</strong>{" "}
            </h1>
            <p>
              Vous pouvez zoomer sur la carte pour afficher une zone en
              particulier
              <br />
              Vous pouvez aussi double-cliquer sur la carte pour zoomer
            </p>
          </div>
        </div>

        <div className="footerElement">
          <img src="" alt="" className="footerImage" />
          <div className="textDescription">
            <h1>
              {" "}
              <strong>Le recentrage</strong>{" "}
            </h1>
            <p>
              Ce bouton qui represente une maison vous permet de recentrer la
              carte à son origine. Ce bouton apparait uniquement après une
              recherche ou un zoom sur la carte.
            </p>
          </div>
        </div>

        <div className="footerElement">
          <img src="" alt="" className="footerImage" />
          <div className="textDescription">
            <h1>
              {" "}
              <strong>La géocalisation</strong>{" "}
            </h1>
            <p>
              En cliquant sur ce bouton, vous demanderez à la carte de vous
              géolocaliser.
              <br />
              La carte vous demandera de confirmer votre action par un message
              d'autorisation de votre navigateur.
            </p>
          </div>
        </div>

        <div className="footerElement">
          <img src="" alt="" className="footerImage" />
          <div className="textDescription">
            <h1>
              {" "}
              <strong>Groupe de marqueurs</strong>{" "}
            </h1>
            <p>
              Les marqueurs sont plus ou moins regroupés en fonction du zoom de
              la carte.
              <br />
              Plus vous zoomerez plus le groupement de marqueurs éclatera en
              petits groupes et vice versa, vous pouvez aussi cliquez sur un.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
