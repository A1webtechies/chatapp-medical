import React from "react";
const id = localStorage.getItem("id")?.toString();
const role = localStorage.getItem("role")?.toString();
const Message = ({ message }) => {
  const { text, uid, photoURL, sp, name = "System" } = message;

  const messageClass = uid === id ? "sent" : "received";

  return (
    <>
      {sp !== id && (role !== "admin1" || role !== "admin2") && (
        <div className={`message ${messageClass}`}>
          <img
            src={
              photoURL ||
              "https://api.adorable.io/avatars/23/abott@adorable.png"
            }
            alt=""
          />
          <p>
            <span style={{ fontSize: 18, fontWeight: 500 }}>
              {name} {": "}
            </span>
            <span>{text}</span>
          </p>
        </div>
      )}
    </>
  );
};
export default Message;
