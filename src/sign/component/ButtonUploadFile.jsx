import React from "react";
import { compressImage } from "../function/compressImage";

function ButtonUploadFile({
  name,
  valueForHtml,
  setImageUrl,
  statePhoto1,
  setStatePhoto1,
  setStatePhoto2,
  setStatePhoto3,
}) {
  const handleFileChange = async (e) => {
    setImageUrl({ photo: "", publication: true });
    e.preventDefault();
    setStatePhoto1(true);
    setStatePhoto2(false);
    setStatePhoto3(false);
    if (!e?.target.files) return;
    const file = e.target.files;
    const result = await compressImage(file, 300, 300, 1);
    setImageUrl({ ...result });
    setStatePhoto1(true);
  };
  return (
    <label htmlFor={valueForHtml} className="labelTelecharger ">
      {!statePhoto1 && (
        <div className="textPhoto">
          <span>{">"}</span> <p className="myText">Télécharger ma photo</p>
        </div>
      )}

      {statePhoto1 && (
        <div className="textPhoto">
          <span>{">"}</span>{" "}
          <p className="myText" style={{ color: "green" }}>
            Votre photo a été télécharger
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

export default ButtonUploadFile;
