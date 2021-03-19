import React, { useState, useEffect } from "react";
import firebase from "../config/firebase";
import { Card, Container, CardContent, Typography } from "@material-ui/core";

const Room = () => {
  // const [userdata, setUserData] = useState([]);
  // const fetchData = async () => {
  //     const db = firebase.firestore();
  //     const res = await db.collection("users").doc('A4yx4uWIImQEkzxGSxnD').get();
  //     console.log(res.data())
  //     // setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     // console.log("getting data" , userdata)
  //   };
  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: 30 }}>
      <Card>
        <CardContent>
          <Typography variant="h3" style={{ textAlign: "center" }}>
            Welcome to Room Component
          </Typography>
          <div>
            <p>
              questionaire is done.....! <br />
              <br />
              Your Room Group is {window.localStorage.getItem("room")}
            </p>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Room;
