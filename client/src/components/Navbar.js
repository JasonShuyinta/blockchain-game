import React from "react";
import { AppBar, Toolbar, Typography, Container, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";

export default function Navbar() {
  const { currentAccount, connectWallet, isOwner, easyAddress } =
    React.useContext(DataContext);

  return (
    <AppBar style={{ marginBottom: "3rem", backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div style={{ width: "10%" }}>
            <Typography variant="h5">
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                LOGO
              </Link>
            </Typography>
          </div>
          <div
            style={{
              display: isOwner ? "block" : "none",
              marginRight: "3rem",
            }}
          >
            <Typography variant="h6">
              <Link
                to="/owner"
                style={{ textDecoration: "none", color: "white" }}
              >
                Owner
              </Link>
            </Typography>
          </div>
          <div style={{ marginRight: "3rem" }}>
            <Typography variant="h6">
              <Link
                to="/myProfile"
                style={{ textDecoration: "none", color: "white" }}
              >
                Profile
              </Link>
            </Typography>
          </div>
          <div style={{ marginRight: "3rem" }}>
            <Typography variant="h6">
              <Link
                to="/play"
                style={{ textDecoration: "none", color: "white" }}
              >
                Play
              </Link>
            </Typography>
          </div>
          <div style={{ marginRight: "3rem" }}>
            <Typography variant="h6">
              <Link
                to="/shop"
                style={{ textDecoration: "none", color: "white" }}
              >
                Shop
              </Link>
            </Typography>
          </div>
          <div style={{ flexGrow: "1" }} />
          <div style={{ display: "flex", marginRight: "2rem" }}>
            {currentAccount ? (
              <>
                <div style={{ cursor: "pointer" }}>
                  <Typography onClick={connectWallet}>Change wallet</Typography>{" "}
                </div>
                <div style={{ marginLeft: "2rem " }}>
                  <Typography>{easyAddress(currentAccount)}</Typography>
                </div>
              </>
            ) : (
              <div style={{ cursor: "pointer" }}>
                <Typography onClick={connectWallet}>Connect wallet</Typography>
              </div>
            )}
          </div>
          <div>
            <Avatar alt="avatarImg" src="" />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
