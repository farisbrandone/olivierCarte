import React, { useState, useRef } from "react";

const ProfileDownload = ({
  setImage,
  statePhoto2,
  setStatePhoto1,
  setStatePhoto2,
  setStatePhoto3,
}) => {
  const [showCapture, setShowCapture] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [stateCapture, setStateCapture] = useState(false);
  const [stateDownload, setStateDownload] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCapture = () => {
    setImage({ photo: "", publication: true });
    setStateCapture(true);
    setShowCapture(true);

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current["srcObject"] = stream;
        setStateDownload(true);
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
      });
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    const photo = canvasRef.current.toDataURL("image/png");
    console.log(photo);
    setPhotoURL({ photo });
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
  };

  const closeCaptureScreen = () => {
    setShowCapture(false);
    setStateCapture(false);
    setPhotoURL(null);
  };

  const retrieveImage = () => {
    if (photoURL) {
      setStatePhoto1(false);
      setStatePhoto2(true);
      setStatePhoto3(false);

      setImage({ photo: photoURL, publication: true });
    }
  };

  return (
    <div className="container">
      {!statePhoto2 && (
        <div onClick={startCapture} className="textPhoto">
          <span>{">"}</span> <p className="myText">Prendre une photo</p>
        </div>
      )}

      {statePhoto2 && (
        <div onClick={startCapture} className="textPhoto">
          <span>{">"}</span>{" "}
          <p className="myText" style={{ color: "green" }}>
            Votre photo a été télécharger
          </p>
        </div>
      )}

      {stateCapture && (
        <div className="captureScreen">
          <div className="smallCaptureScreen">
            <div
              title="Fermer"
              onClick={closeCaptureScreen}
              className="closeElement"
            >
              x
            </div>
            {showCapture && (
              <div id="photo-capture-container">
                <video ref={videoRef} width="300" height="300" autoPlay></video>
                <button onClick={capturePhoto}>Capture Photo</button>
                <canvas
                  ref={canvasRef}
                  width="300"
                  height="300"
                  className=""
                ></canvas>
              </div>
            )}
            {photoURL && (
              <div>
                <img src={photoURL} alt="Captured" />

                <div className="finalPhoto" onClick={retrieveImage}>
                  {!statePhoto2 && (
                    <p>Click ici pour la récupération de ta photo</p>
                  )}
                  {statePhoto2 && (
                    <p style={{ color: "green" }}>
                      L'image a été enregistrer, vous pouvez fermer et continuer
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDownload;
