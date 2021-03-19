import React, { useState } from "react";
import firebase from "../config/firebase";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";

import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
const firestore = firebase.firestore();
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        LeanOn
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = await firestore
      .collection("users")
      .where("email", "==", email)
      .where("password", "==", password)
      .get();
    if (!query.empty) {
      const snapshot = query.docs[0];
      localStorage.setItem("id", snapshot.id);
      const data = snapshot.data();
      localStorage.setItem("role", data.role);
      if (data.firstLogin && !data.newBie) {
        await firestore.collection(data.room).add({
          text: `${data.name} (${data.role}) has joined the room`,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid: snapshot.id,
          photoURL: "https://picsum.photos/200/300",
          name: data.name,
          sp: snapshot.id,
        });
      }

      if (data.firstLogin) {
        await firestore
          .collection("users")
          .doc(snapshot.id)
          .update({ firstLogin: false });
      }

      if (data.newBie) {
        history.push({
          pathname: "/questions",
        });
      } else {
        history.push({
          pathname: "/room",
        });
        localStorage.setItem("room", data.room);
      }
    } else {
      setOpen(true);
    }

    // if (email === users.email && users.newBie === true) {
    // history.push({
    //   pathname: "/questions",
    // });
    // }
    // if (email === users.email && users.newBie === false) {

    // }
  };
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error">
          Email or password is wrong
        </Alert>
      </Snackbar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            onChange={handleEmailChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
          />
          <TextField
            onChange={handlePasswordChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
          />

          <Button
            onClick={handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
