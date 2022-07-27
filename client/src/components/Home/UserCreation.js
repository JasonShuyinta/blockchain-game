import React, { useState, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import {
  TextField,
  Button,
  Card,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
} from "@mui/material";

export default function UserCreation() {
  const { createUser, loadingUserCreation, setLoadingUserCreation } =
    useContext(DataContext);

  const [inputUser, setInputUser] = useState("");

  const handleCreateUser = (user) => {
    setLoadingUserCreation(true);
    createUser(user);
  };

  return (
    <>
      <div
        style={{
          marginTop: "4rem",
          height: "88vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          filter: loadingUserCreation ? "blur(4px)" : "none",
        }}
      >
        <Card
          elevation={3}
          style={{
            padding: "3rem 5rem",
          }}
        >
          <div>
            <Typography variant="h4">Create a user to play the game</Typography>
            <div style={{ textAlign: "center", marginTop: "4rem" }}>
              <TextField
                value={inputUser}
                onChange={(e) => setInputUser(e.target.value)}
                label="Username"
                variant="outlined"
              />
              <br></br>
              <Button
                variant="contained"
                className="button"
                onClick={() => handleCreateUser(inputUser)}
                style={{ marginTop: "3rem" }}
              >
                Create
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Dialog
        open={loadingUserCreation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}>
        <DialogTitle id="alert-dialog-title" align="center">
          <CircularProgress style={{ height: 100, width: 100, color: "black" }} />
        </DialogTitle>
      </Dialog>
    </>
  );
}
