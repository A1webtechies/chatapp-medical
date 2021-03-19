import React from "react";
import {
  Card,
  Container,
  Grid,
  CardContent,
  Button,
  Typography,
  CardMedia,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import Logo from "../assets/img/leanon.jpg";
const Home = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: 30 }}>
      <Card>
        <div style={{ height: 200, display: "flex", justifyContent: "center" }}>
          <img src={Logo} alt="" />
        </div>
        <CardContent>
          <Typography
            variant="h2"
            style={{ textAlign: "center", fontFamily: "Kelly Saab" }}
          >
            Welcome to Lean On
          </Typography>
          <div>
            <p
              style={{
                color: "black",
                textAlign: "center",
                fontFamily: "Kelly Saab",
              }}
            >
              {/* <h1>The place where you start leaning on your peers!</h1> */}
            </p>
          </div>
          <Container>
            <Typography
              variant="h4"
              style={{ textAlign: "center", fontFamily: "Kelly Saab" }}
            >
              WHO ARE YOU?
              <p></p>
            </Typography>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="secondary" size="large">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: 19,
                    }}
                    to="/register/admin1"
                  >
                    <b>Mental Health Practioner</b>
                  </Link>
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" size="large">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: 19,
                    }}
                    to="/register/admin2"
                  >
                    <b>Peer Support Worker</b>
                  </Link>
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" size="large">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: 19,
                    }}
                    to="/register/client"
                  >
                    <b>Mental Health Patient</b>
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </Container>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;
