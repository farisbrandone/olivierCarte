import React, { useState } from "react";
import { compressImage2 } from "../function/compressImage";

function ButtonUploadFile2({
  name,
  valueForHtml,
  setImageUrl,
  statePhoto3,
  setStatePhoto1,
  setStatePhoto2,
  setStatePhoto3,
}) {
  const handleFileChange = async (e) => {
    setImageUrl({ photo: "", publication: true });
    e.preventDefault();

    setStatePhoto2(false);
    setStatePhoto1(false);
    if (!e?.target.files) return;
    const file = e.target.files;
    const result = await compressImage2(file, 300, 300, 1);
    setImageUrl({ ...result });
    setStatePhoto3(true);
  };
  return (
    <label htmlFor={valueForHtml} className="labelTelecharger ">
      {!statePhoto3 && (
        <div className="textPhoto">
          <span>{">"}</span>{" "}
          <p className="myText">Ne souhaite pas publier ma photo</p>
        </div>
      )}

      {statePhoto3 && (
        <div className="textPhoto">
          <span>{">"}</span>{" "}
          <p className="myText" style={{ color: "green" }}>
            Votre photo ne sera pas publier.
          </p>
        </div>
      )}

      <input
        name={name}
        id={valueForHtml}
        type="file"
        className="inputTelecharger"
        onChange={handleFileChange}
      />
    </label>
  );
}

export default ButtonUploadFile2;
