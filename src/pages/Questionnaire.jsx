import React, { useState } from "react";
import {
  makeStyles,
  Container,
  CssBaseline,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import Questions from "../data/";
import { useHistory } from "react-router-dom";
import firebase from "../config/firebase";
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  question: {
    fontSize: "1.8rem",
    marginBottom: theme.spacing(4),
  },
  clicked: {
    backgroundColor: "green",
    color: "white",
    width: "80%",
    border: "1px solid teal",
    borderRadius: 10,
    paddingLeft: 16,
    cursor: "pointer",

    marginBottom: 24,
    height: 50,
    display: "flex",
    alignItems: "center",
  },
  questionItem: {
    width: "80%",
    border: "1px solid teal",
    borderRadius: 10,
    paddingLeft: 16,
    cursor: "pointer",

    marginBottom: 24,
    height: 50,
    display: "flex",
    alignItems: "center",
  },
}));

const Questionnaire = () => {
  const db = firebase.firestore();
  const history = useHistory();
  // console.log("-===========", history)

  const user = {
    name: window.localStorage.getItem("name"),
    role: window.localStorage.getItem("role"),
    id: localStorage.getItem("id"),
  };
  const classes = useStyles();
  const [group, setGroup] = useState("");
  const [selected, setSelected] = useState("");
  const [progress, setProgress] = useState(0);

  const handleClick = (ans) => {
    if (ans === 1) {
      setGroup("group" + progress);
    }
    setSelected("group" + progress + ans);
  };

  const getGroupName = () => {
    switch (group) {
      case "group1":
        return "Defeat Gender Dysphoria";
      case "group2":
        return "Defeat Eating Disorder";
      case "group3":
        return "DEFEAT BPD";
      case "group4":
        return "Defeat Bipolar Disorder";

      default:
        return "Defeat Gender Dysphoria";
    }
  };

  return (
    <Container component="main" maxWidth="sm" style={{ marginTop: 24 }}>
      <CssBaseline />
      <Card>
        {progress < 5 && (
          <CardContent>
            <div className={classes.paper}>
              <Typography component="h6" className={classes.question}>
                {Questions[user.role][progress].text}
              </Typography>

              <div
                className={
                  selected === "group" + progress + 1
                    ? classes.clicked
                    : classes.questionItem
                }
                onClick={() => handleClick(1)}
              >
                <p style={{ fontSize: "1.3rem" }}>
                  {Questions[user.role][progress].answer1}
                </p>
              </div>
              <div
                className={
                  selected === "group" + progress + 0
                    ? classes.clicked
                    : classes.questionItem
                }
                onClick={() => handleClick(0)}
              >
                <p style={{ fontSize: "1.3rem" }}>
                  {Questions[user.role][progress].answer2}
                </p>
              </div>
            </div>
          </CardContent>
        )}
        <CardActions
          style={{
            display: "flex",

            justifyContent: "space-between",
          }}
        >
          <Button
            color="secondary"
            disabled={progress <= 0}
            onClick={() => {
              if (progress > 0) {
                setProgress((prev) => prev - 1);
              }
            }}
          >
            <ArrowLeft />
            <Typography>{" Pre"}</Typography>
          </Button>
          <Button
            color="secondary"
            disabled={progress >= 5}
            onClick={async () => {
              if (progress < 4) {
                setProgress((prev) => prev + 1);
              } else {
                const room = getGroupName();
                if (user.role === "admin1" || user.role === "admin2") {
                  await db.collection(room).add({
                    text: `Hello! My name is ${user.name}. I'm your peer support worker. Always keep in mind that you're loved and important. We are in this together. :)`,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    uid: user.id,
                    photoURL: "https://picsum.photos/200/300",
                    sp: user.id,
                  });
                }
                localStorage.setItem("room", room);
                const id = localStorage.getItem("id");
                await db
                  .collection("users")
                  .doc(id?.toString())
                  .update({ newBie: false, room });
                history.push("/room");
              }
            }}
          >
            <Typography>{"Next "}</Typography>
            <ArrowRight />
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Questionnaire;
