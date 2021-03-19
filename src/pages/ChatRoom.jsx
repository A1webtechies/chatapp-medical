import { TextField, Button, Modal } from "@material-ui/core";
import { DateRange, HelpOutline, Phone, Send } from "@material-ui/icons";
import React, { useEffect, useState, useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import firebase from "../config/firebase";
import Message from "./Message";

const firestore = firebase.firestore();

const ChatRoom = () => {
  const id = localStorage.getItem("id");
  const room = localStorage.getItem("room");
  const role = localStorage.getItem("role");
  const [user, setUser] = useState("");
  useEffect(() => {
    const getUser = async () => {
      const res = await firestore.collection("users").doc(id).get();
      setUser(res.data());
    };
    if (id) {
      getUser();
    }
  }, []);
  const dummy = useRef();
  const messagesRef = firestore.collection(room);
  const query = messagesRef.orderBy("createdAt").limit(2000);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    setFormValue("");

    const { uid = id, photoURL = "https://picsum.photos/200/300", name } = user;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      name,
    });

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat">
      <section>
        <header>
          <a
            href="https://www.microsoft.com/en-gb/microsoft-teams/group-chat-software"
            target="_blank"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Phone />
          </a>

          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`${role}`}
          >
            <h4>
              {room} <HelpOutline style={{ position: "relative", top: 8 }} />
            </h4>
          </Link>

          <h4>{user?.name}</h4>
        </header>

        {messages &&
          messages.map((msg) => <Message key={msg.id} message={msg} />)}
        <span ref={dummy}></span>

        <form onSubmit={sendMessage} className="messageform">
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="speak kind"
          />
          {(role === "admin1" || role === "admin2") && (
            <button type="button" onClick={() => setOpen(true)}>
              <DateRange />
            </button>
          )}
          <button type="submit" disabled={!formValue}>
            <Send />
          </button>
        </form>
      </section>

      <DateModal
        user={user}
        open={open}
        handleClose={handleClose}
        messagesRef={messagesRef}
        id={id}
        dummy={dummy}
      />
    </div>
  );
};
const DateModal = ({ user, open, handleClose, id, messagesRef, dummy }) => {
  const [date, setDate] = useState("");

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <form
        noValidate
        style={{
          position: "absolute",
          width: 320,
          backgroundColor: "white",
          border: "2px solid #000",
          boxShadow: 40,
          padding: "8px 20px",
          top: `${94}%`,
          left: `${92}%`,
          transform: `translate(-${94}%, -${72}%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            defaultValue={new Date()}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <Button
            style={{ position: "relative", top: 10, marginLeft: 30 }}
            onClick={async () => {
              const dtarray = date.toString().split("T");
              const sd = dtarray[0].split("-");

              const {
                uid = id,
                photoURL = "https://picsum.photos/200/300",
                name,
              } = user;
              handleClose();

              await messagesRef.add({
                text: `Your next session is scheduled for Date: ${sd[2]}/${sd[1]}/${sd[0]} Time: ${dtarray[1]}`,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL,
                name,
              });

              dummy.current.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Send
              style={{
                color: "teal",
              }}
            />
          </Button>
        </div>
      </form>
    </Modal>
  );
};
export default ChatRoom;
