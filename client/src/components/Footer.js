import { Typography, Grid } from "@mui/material";
import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaTwitterSquare,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer-container">
      <Grid container style={{ paddingTop: "5rem" }}>
        <Grid item xs={12} sm={3} className="footer-grid">
          <Typography variant="h5">Services</Typography>
          <Typography variant="subtitle2">Web design</Typography>
          <Typography variant="subtitle2">Development</Typography>
          <Typography variant="subtitle2">Hosting</Typography>
        </Grid>
        <Grid item xs={12} sm={3} className="footer-grid">
          <Typography variant="h5">About</Typography>
          <Typography variant="subtitle2">Company</Typography>
          <Typography variant="subtitle2">Team</Typography>
          <Typography variant="subtitle2">Legacy</Typography>
        </Grid>
        <Grid item xs={12} sm={3} className="footer-grid">
          <Typography variant="h5">Careers</Typography>
          <Typography variant="subtitle2">Job openings</Typography>
          <Typography variant="subtitle2">Employee success</Typography>
          <Typography variant="subtitle2">Benefits</Typography>
        </Grid>
        <Grid item xs={12} sm={3} className="footer-grid">
          <div className="socials">
            <FaFacebook />
            <FaLinkedin />
            <FaTwitterSquare />
            <FaInstagram />
          </div>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography variatn="subtitle2">
            Monsterworld © {new Date().getFullYear()}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
