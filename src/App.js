import React, { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Questionnaire from "./pages/Questionnaire";
import ChatRoom from "./pages/ChatRoom";

import DummyText from "./pages/DummyText";
import "./App.css";
import firebase from "./config/firebase";
import Admin1Info from "./pages/Admin1Info";
import Admin2Info from "./pages/Admin2Info";
const firestore = firebase.firestore();

const App = () => {
  const id = localStorage.getItem("id");
  const [user, setUser] = useState("");
  const history = useHistory();
  useEffect(() => {
    const getUser = async () => {
      const res = await firestore.collection("users").doc(id).get();
      setUser(res.data());
    };
    if (id) {
      getUser();
      if (user) {
        localStorage.setItem("room", user.room);
        localStorage.setItem("role", user.role);
        if (user.newBie)
          history.push({
            pathname: "/questions",
          });
        else
          history.push({
            pathname: "/room",
          });
      }
    }
  }, []);

  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register/:role" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/questions" component={Questionnaire} />{" "}
          <Route path="/room" component={ChatRoom} />
          <Route path="/client" component={DummyText} />
          <Route path="/admin1" component={Admin1Info} />
          <Route path="/admin2" component={Admin2Info} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
