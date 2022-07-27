import React, { useContext, useState } from "react";
import {
  Typography,
  TableCell,
  TableBody,
  TableRow,
  Box,
  Paper,
  Table,
  TableHead,
  TableContainer,
  Grid,
  Button,
  Card,
  CardContent,
  TextField,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { DataContext } from "../../context/DataContext";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Sell() {
  const {
    userMonsters,
    sellMonster,
    getType,
    userActiveMonster,
    openSuccessSellMonster,
    setOpenSuccessSellMonster,
    monsterAlreadyOnSell,
    setMonsterAlreadyOnSell,
    loadingSellMonster,
  } = useContext(DataContext);

  const [selectedMonster, setSelectedMonster] = useState(null);
  const [monsterPrice, setMonsterPrice] = useState(0);
  const [trySellActiveMonster, setTrySellActiveMonster] = useState(false);

  const chooseMonster = (userMonsters) => {
    if (userActiveMonster.id === userMonsters.id) {
      setTrySellActiveMonster(true);
      return;
    } else {
      setSelectedMonster(userMonsters);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    setOpenSuccessSellMonster(false);
  };

  const handleCloseTrySellActiveMonster = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    setTrySellActiveMonster(false);
  };

  const handleCloseMonsterAlreadyOnSell = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    setMonsterAlreadyOnSell(false);
  };

  return (
    <div style={{ padding: "0 1rem" }}>
      <Typography
        variant="h5"
        style={{ marginBottom: "1rem", marginLeft: "1rem" }}
      >
        <b>Sell Your Monsters</b>
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
                  <TableCell>
                    <b>Type</b>
                  </TableCell>
                  <TableCell>
                    <b>Healt Points</b>
                  </TableCell>
                  <TableCell>
                    <b>Level</b>
                  </TableCell>
                  <TableCell>
                    <b>Image</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              {
                <TableBody>
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
                        onClick={() => chooseMonster(userMonster)}
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
                        <TableCell style={{ textTransform: "capitalize" }}>
                          <div style={{ display: "flex" }}>
                            <span>{getType(userMonster.typeOfMonster)}</span>
                            <img
                              src={`https://monsterimagesaws.s3.eu-central-1.amazonaws.com/${getType(
                                userMonster.typeOfMonster
                              )}.png`}
                              alt="water"
                              className="typeIcon"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{userMonster.healthPoints}</TableCell>
                        <TableCell>{userMonster.level}</TableCell>
                        <TableCell>
                          <img
                            src={userMonster.urlImg}
                            alt={userMonster.name}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              }
            </Table>
          </TableContainer>
        </div>
      </Box>

      {selectedMonster && (
        <>
          <div
            style={{
              textAlign: "center",
              margin: "1rem 0",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              style={{ marginBottom: "1rem" }}
            >
              You are selling
            </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" style={{ marginBottom: "1rem" }}>
                {" "}
                <b>Info</b>
              </Typography>
              <Card
                sx={{
                  minWidth: 275,
                  border: "1px solid #e0e0e0",
                  borderRadius: "10px",
                }}
              >
                <CardContent style={{ padding: "0.5" }}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Type" />
                      <ListItemText
                        align="right"
                        style={{ textTransform: "capitalize" }}
                        secondary={getType(selectedMonster.typeOfMonster)}
                      />
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
                          className="typeIcon"
                        />
                      </ListItemIcon>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Health points" />
                      <ListItemText
                        align="right"
                        secondary={selectedMonster.healthPoints}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Level" />
                      <ListItemText
                        align="right"
                        secondary={selectedMonster.level}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
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
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
            </Grid>
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "2rem",
            }}
          >
            <TextField
              value={monsterPrice}
              onChange={(e) => setMonsterPrice(e.target.value)}
              label="MATIC"
              variant="outlined"
              style={{ margin: "1rem" }}
            />{" "}
            <Button
              className="button"
              variant="contained"
              style={{ margin: "1rem 0" }}
              onClick={() => sellMonster(selectedMonster.id, monsterPrice)}
            >
              Sell
            </Button>
          </div>
        </>
      )}

      <Dialog
        open={openSuccessSellMonster}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#ccffcc',
          },
        }}>
        <DialogTitle id="alert-dialog-title" align="center">
          <h2>{"Monster put on sell with success"}</h2>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            <h4>Close</h4>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={trySellActiveMonster}
        onClose={handleCloseTrySellActiveMonster}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#ffcccc',
          },
        }}>
        <DialogTitle id="alert-dialog-title" align="center">
          <h2>{"You cannot sell the active monster"}</h2>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseTrySellActiveMonster} autoFocus>
            <h4>Close</h4>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={monsterAlreadyOnSell}
        onClose={handleCloseMonsterAlreadyOnSell}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#ffcccc',
          },
        }}>
        <DialogTitle id="alert-dialog-title" align="center">
          <h2>{"Monster already on sell"}</h2>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseMonsterAlreadyOnSell} autoFocus>
            <h4>Close</h4>
          </Button>
        </DialogActions>
      </Dialog>
      
      
      <Dialog
        open={loadingSellMonster}
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
