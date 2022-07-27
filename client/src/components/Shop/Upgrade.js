import React, { useContext, useState } from "react";
import {
  TableCell,
  Typography,
  Box,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableBody,
  Card,
  CardContent,
  Button,
  Grid,
  ListItem,
  ListItemText,
  ListItemIcon,
  List,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogActions,
  CircularProgress
} from "@mui/material";
import { DataContext } from "../../context/DataContext";

export default function Upgrade() {
  const {
    userMonsters,
    getType,
    buyLevelUp,
    moveToBuy,
    callBuyMove,
    userActiveMonster,
    openSuccessUpgrade,
    setOpenSuccessUpgrade,
    loadingUpgrade,
    openBuyMove,
    setOpenBuyMove
  } = useContext(DataContext);

  const [selectedMonster, setSelectedMonster] = useState(null);

  const chooseMonsterToUpgrade = (userMonsters) => {
    setSelectedMonster(userMonsters);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessUpgrade(false);
  };

  const handleCloseBuyMove = () => {
    setOpenBuyMove(false);
  };

  const handleCloseLevelUp = () => {
    setOpenSuccessUpgrade(false);
  };

  return (
    <>
      <Snackbar
        open={openSuccessUpgrade}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Level Up carried out successfully!" />
        
        <div style={{ padding: "0 1rem" }}>
        <Typography
          variant="h5"
          style={{ marginBottom: "1rem", marginLeft: "1rem" }}
        >
          <b>Upgrade</b>
        </Typography>
        <Box sx={{ flexGrow: 1, marginTop: "2rem" }}>
          <div style={{ margin: "1rem 1rem 1rem 0" }}>
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Name</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Type</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Healt Points</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Level</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Image</b>
                    </TableCell>
                  </TableRow>
                </TableHead>

                {<TableBody>
                  {userMonsters
                    .filter(function (userMonsters) {
                      if (userMonsters.name === "") {
                        return false;
                      }
                      return true;
                    })
                    .map((userMonster) => (
                      <TableRow
                        key={userMonster.id}
                        className="tableRow"
                        onClick={() => chooseMonsterToUpgrade(userMonster)}
                      >
                        <TableCell component="th" scope="row">
                          {userMonster.name}
                          {userActiveMonster.id === userMonster.id ? (
                            <span
                              style={{
                                marginLeft: "0.5rem",
                                fontSize: "smaller",
                              }}
                            >
                              <i>(Active)</i>
                            </span>
                          ) : null}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ textTransform: "capitalize" }}
                        >
                          <div className="center">
                            <span>{getType(userMonster.typeOfMonster)}</span>
                            <img
                              src={`https://monsterimagesaws.s3.eu-central-1.amazonaws.com/${getType(
                                userMonster.typeOfMonster
                              )}.png`}
                              alt="water"
                              className="typeIcon" />
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          {userMonster.healthPoints}
                        </TableCell>
                        <TableCell align="center">
                          {userMonster.level}
                        </TableCell>
                        <TableCell align="center">
                          <img
                            src={userMonster.urlImg}
                            alt={userMonster.name}
                            style={{ width: "50px", height: "50px" }} />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>}
              </Table>
            </TableContainer>
          </div>
        </Box>

        {selectedMonster && (
          <>
            <Typography variant="h6" align="center" style={{ margin: "1rem 0" }}>
              <b>Upgrade Your Monster</b>
            </Typography>
            <Grid container spacing={2} style={{ marginBottom: "1rem" }}>
              <Grid item xs={6}>
                <Typography variant="h6" style={{ marginBottom: "1rem" }}>
                  <b>Info</b>
                </Typography>
                <Card
                  sx={{
                    minWidth: 275,
                    border: "1px solid #e0e0e0",
                    borderRadius: "10px",
                  }}
                >
                  <CardContent>
                    <List>
                      <ListItem>
                        <ListItemText primary="Type" />
                        <ListItemText
                          align="right"
                          style={{ textTransform: "capitalize" }}
                          secondary={getType(selectedMonster.typeOfMonster)} />
                        <ListItemIcon
                          align="right"
                          style={{
                            maxWidth: "20px",
                            width: "20px",
                            minWidth: "20px",
                          }}
                        >
                          <img
                            src={`https://monsterimagesaws.s3.eu-central-1.amazonaws.com/${getType(
                              selectedMonster.typeOfMonster
                            )}.png`}
                            alt="water"
                            className="typeIcon" />
                        </ListItemIcon>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Health points" />
                        <ListItemText
                          align="right"
                          secondary={selectedMonster.healthPoints} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Level" />
                        <ListItemText
                          align="right"
                          secondary={selectedMonster.level} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "1rem",
                  }}
                >
                  <Typography variant="body1" style={{ marginTop: "0.5rem" }}>
                    <i>Level up for 0.05 MATIC</i>
                  </Typography>
                  <img
                    src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/maticlogo1.png"
                    alt="maticlogo"
                    className="maticLogo"
                    style={{ marginTop: "0.5rem", marginRight: "0.5rem" }} />
                  <Button
                    className="button"
                    variant="contained"
                    onClick={() => buyLevelUp(parseInt(selectedMonster.id))}
                  >
                    Buy
                  </Button>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ textAlign: "center" }}>
                  <Typography variant="h6">
                    <b>{selectedMonster.name} </b>
                  </Typography>
                </div>
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                  <img
                    src={selectedMonster.urlImg}
                    alt="sellingMonster"
                    style={{ width: "200px", height: "200px" }} />
                </div>
              </Grid>
            </Grid>
            <Typography variant="h6" style={{ marginBottom: "1rem" }}>
              {" "}
              <b>Buy upgrades</b>
            </Typography>
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
                    <TableCell align="center">
                      {" "}
                      <b> Action </b>{" "}
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
                            className="typeIcon" />
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Typography variant="body1">
                            {move.price / 100} MATIC
                          </Typography>
                          <img
                            src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/maticlogo1.png"
                            alt="maticlogo"
                            className="maticLogo" />
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          className="button"
                          variant="contained"
                          onClick={() => callBuyMove(
                            selectedMonster.id,
                            move.name,
                            move.damage,
                            move.typeOfMove,
                            move.price
                          )}
                        >
                          Buy
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
      
      <Dialog
        open={loadingUpgrade}
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

      <Dialog
        open={openBuyMove}
        onClose={handleCloseBuyMove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#ccffcc', // #66ff66
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" align="center">
          <h2>{"Move acquired with successor"}</h2>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseBuyMove} autoFocus>
            <h4>Close</h4>
          </Button>
        </DialogActions>
      </Dialog>    

      <Dialog
        open={openSuccessUpgrade}
        onClose={handleCloseLevelUp}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#ccffcc', // #66ff66
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" align="center">
          <h2>{"Level Up successfully"}</h2>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseLevelUp} autoFocus>
            <h4>Close</h4>
          </Button>
        </DialogActions>
      </Dialog>      
      </>
  );
}
