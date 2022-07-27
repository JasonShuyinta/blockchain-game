import React, { useContext, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { DataContext } from "../../context/DataContext";
export default function Move() {
  const [moveName, setMoveName] = useState("");
  const [moveType, setMoveType] = useState("");
  const [moveDamage, setMoveDamage] = useState("");
  const [movePrice, setMovePrice] = useState("");

  const {
    addMove,
    moveToBuy,
    getType,
    openSuccessAddMove,
    setOpenSuccessAddMove,
    loadingAddNewMove,
  } = useContext(DataContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessAddMove(false);
  };

  return (
    <div style={{ padding: "0 1rem" }}>
      <Typography
        variant="h4"
        align="center"
        style={{ marginBottom: "1rem" }}
      >
        <b>Add new buyble move</b>
      </Typography>
      <div align="center">
        <Grid container className="OwnerGrid">
          <Grid item xs={6} style={{ padding: "1rem 2rem" }}>
            <TextField
              label="Name"
              value={moveName}
              onChange={(e) => setMoveName(e.target.value)}
              variant="outlined"
              fullWidth
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              label="Damage"
              value={moveDamage}
              onChange={(e) => setMoveDamage(e.target.value)}
              variant="outlined"
              fullWidth
              style={{ marginBottom: "1rem" }}
            />
          </Grid>

          <Grid item xs={6} style={{ padding: "1rem 2rem" }}>
            <TextField
              label="Type"
              value={moveType}
              onChange={(e) => setMoveType(e.target.value)}
              variant="outlined"
              fullWidth
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              label="Price"
              value={movePrice}
              onChange={(e) => setMovePrice(e.target.value)}
              variant="outlined"
              fullWidth
              style={{ marginBottom: "1rem" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ textAlign: "center", paddingTop: "1rem" }}
          >

            <Button
              variant="contained"
              className="button"
              onClick={() => addMove(moveName, moveDamage, moveType, movePrice)}
            >
              Add Move
            </Button>
          </Grid>
        </Grid>

        <Typography
        variant="h4"
        align="center"
        style={{ marginBottom: "1rem", marginTop:"3rem" }}
      >
        <b>List of buyble move</b>
      </Typography>
        <Grid container className="OwnerGrid">
          <Grid item xs={12} style={{ padding: "1rem 2rem" }}>
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Move</b>
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <b> Damage </b>{" "}
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <b> Type </b>
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <b>Price </b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {moveToBuy.map((move, index) => (
                    <TableRow key={index} className="tableRow">
                      <TableCell component="th" scope="row">
                        {move.name}
                      </TableCell>
                      <TableCell align="center">{move.damage}</TableCell>
                      <TableCell
                        align="center"
                        style={{ textTransform: "capitalize" }}
                      >
                        {" "}
                        <div className="center">
                          <Typography variant="body1">
                            {getType(move.typeOfMove)}
                          </Typography>
                          <img
                            src={`https://monsterimagesaws.s3.eu-central-1.amazonaws.com/${getType(
                              move.typeOfMove
                            )}.png`}
                            alt="type"
                            className="typeIcon"
                          />
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div
                          style={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <Typography variant="body1">
                            {move.price} MATIC
                          </Typography>
                          <img
                            src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/maticlogo1.png"
                            alt="maticlogo"
                            className="maticLogo"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>


      <Dialog
        open={openSuccessAddMove}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#ccffcc',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" align="center">
          <h2>{"New move add"}</h2>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            <h4>Close</h4>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={loadingAddNewMove}
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
    </div>
  );
}