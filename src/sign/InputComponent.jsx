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
  console.log(messagePassword + "papa");
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
      {messagePassword ? (
        <p className="text-red-700 text-[12px] w-[240px] text-wrap  whitespace-pre">
          {" "}
          {messagePassword}{" "}
        </p>
      ) : (
        <p className="text-green-700 text-[12px] w-[240px] text-wrap whitespace-pre">
          {valid}
        </p>
      )}
    </div>
  );
}

export { InputComponent, InputComponent3, InputComponent2 };
