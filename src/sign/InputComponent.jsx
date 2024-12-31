import React from "react";

function InputComponent({
  val,
  myId,
  icon,
  placeholder,
  type,
  handleChange,
  pass,
}) {
  return (
    <div className="containerInput">
      <div className="caseIcon"> {icon} </div>
      <input
        id={myId}
        type={type}
        placeholder={placeholder}
        className="inputInsc"
        value={val}
        onChange={handleChange}
        style={{ borderColor: pass && "red" }}
      />
    </div>
  );
}

function InputComponent2({ val, setValue, myId, placeholder, type }) {
  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  return (
    <div className="containerInput">
      <input
        id={myId}
        type={type}
        placeholder={placeholder}
        className="inputInsc2"
        value={val}
        onChange={handleChange}
      />
    </div>
  );
}

function InputComponent3({
  val,
  myId,
  icon,
  placeholder,
  type,
  handleChange,
  pass,
  messagePassword,
  valid,
}) {
  return (
    <div>
      <div className="containerInput">
        <div className="caseIcon"> {icon} </div>
        <input
          id={myId}
          type={type}
          placeholder={placeholder}
          className="inputInsc"
          value={val}
          onChange={handleChange}
          style={{ borderColor: pass && "red" }}
        />
      </div>
      {messagePassword ? (
        <p className="message22"> {messagePassword} </p>
      ) : (
        <p className="message11">{valid}</p>
      )}
    </div>
  );
}

export { InputComponent, InputComponent3, InputComponent2 };
