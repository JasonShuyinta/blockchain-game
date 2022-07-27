import React, { useEffect } from "react";
import { Card, Grid, Typography } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";
import Footer from "../Footer";

export default function AccountLessHome() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <>
      <div style={{ marginTop: "4rem" }}>
        <Grid container className="container" style={{ height: "100vh" }}>
          <Grid item xs={8} style={{ padding: "3rem" }}>
            <Typography
              variant="h1"
              style={{ top: "15%", position: "relative" }}
            >
              Welcome to Monsterworld
            </Typography>
            <Typography
              variant="h4"
              style={{ top: "20%", position: "relative" }}
            >
              Battle, trade, catch and evolve your monsters!
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <div align='center'>
              <img
                src="https://blockchain-project-monster.s3.eu-central-1.amazonaws.com/allMonsters.png"
                alt="threemonsters"
                style={{ width: "80%", height: "90vh" }}
              />
            </div>
          </Grid>
        </Grid>

        <div
          style={{
            backgroundImage:
              "url('https://monsterimagesaws.s3.eu-central-1.amazonaws.com/background.png')",
          }}
          className="accountlesshome-container"
        >
          <Grid container>
            <Grid item xs={6} className="center" data-aos="fade-up">
              <Card elevation={3} className="card-rotate-left">
                <img
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/strumento+di+cattura+normal.png"
                  alt="snippingtool"
                  style={{ width: "150px", height: "150px" }}
                />
              </Card>
            </Grid>
            <Grid item xs={6} style={{ padding: "0 4rem" }} data-aos="fade-up">
              <Typography variant="h3" style={{ margin: "5rem 0 2rem 0" }}>
                Catch all the monsters you can!
              </Typography>
              <Typography variant="h6">
                Roam on an open-world, and search for the rarest monsters you
                could find!
              </Typography>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "6rem" }}>
            <Grid
              item
              xs={6}
              style={{ paddingLeft: "4rem" }}
              data-aos="fade-up"
            >
              <Typography
                variant="h3"
                style={{
                  margin: "5rem 0 2rem 0",
                }}
              >
                Fight against super strong opponents!
              </Typography>
              <Typography variant="h6">
                Battle until the last one stands! Good Luck!
              </Typography>
            </Grid>
            <Grid item xs={6} className="center">
              <Card
                elevation={3}
                className="card-rotate-right"
                data-aos="fade-up"
              >
                <img
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/battleicon.png"
                  alt="battle"
                  style={{ width: "150px", height: "150px" }}
                />
              </Card>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "6rem" }}>
            <Grid item xs={6} className="center" data-aos="fade-up">
              <Card elevation={3} className="card-rotate-left">
                <img
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/upgradenobg.png"
                  alt="upgrade"
                  style={{ width: "180px", height: "180px" }}
                />
              </Card>
            </Grid>
            <Grid item xs={6} style={{ padding: "0 4rem" }} data-aos="fade-up">
              <Typography variant="h3" style={{ margin: "5rem 0 2rem 0" }}>
                Upgrade and power up!
              </Typography>
              <Typography variant="h6">
                Make your monsters the strongest monsters we have ever seen on
                monsterworld!
              </Typography>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "6rem", paddingBottom: "10rem" }}>
            <Grid
              item
              xs={6}
              style={{ paddingLeft: "4rem" }}
              data-aos="fade-up"
            >
              <Typography
                variant="h3"
                style={{
                  margin: "5rem 0 2rem 0",
                }}
              >
                Trade your monsters!
              </Typography>
              <Typography variant="h6">
                Go to the marketplace and sell or exchange your monsters!
              </Typography>
            </Grid>
            <Grid item xs={6} className="center">
              <Card
                elevation={3}
                className="card-rotate-right"
                data-aos="fade-up"
              >
                <img
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/tradenobg.png"
                  alt="snippingtool"
                  style={{ width: "180px", height: "180px" }}
                />
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer />
    </>
  );
}
