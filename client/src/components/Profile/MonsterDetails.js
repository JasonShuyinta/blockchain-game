import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  CircularProgress
} from "@mui/material";
import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";

export default function MonsterDetails({ selectedMonster }) {
  const {
    getType,
    selectedMonsteMoves,
    callSetActiveMonster,
    userActiveMonster,
    loadingSetActiveMonster,
    openSuccessSetActiveMonster,
    setOpenSuccessSetActiveMonster,
  } = useContext(DataContext);

  const handleCloseSuccessSetActiveMonster = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    setOpenSuccessSetActiveMonster(false);
  };


  return (
    <div style={{ width: "800px" }}>
      <DialogTitle>
        <span>Details</span>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={7}>
            <Card
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
              }}
            >
              <CardContent style={{ padding: "0.5" }}>
                <List>
                  <ListItem>
                    <ListItemText primary="Name" />
                    <ListItemText
                      align="right"
                      secondary={selectedMonster.name}
                    />
                  </ListItem>
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
          <Grid
            item
            xs={5}
            className="center"
            style={{
              alignItems: "center",
            }}
          >
            <img
              src={selectedMonster.urlImg}
              alt={selectedMonster.name}
              style={{ width: "200px", height: "200px" }}
            />
          </Grid>
        </Grid>
        <Typography variant="h5" style={{ margin: "2rem 0 1rem 0" }}>
          {" "}
          Moves{" "}
        </Typography>
        <TableContainer component={Paper} className="table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <b>Move</b>
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <b>Damage </b>
                </TableCell>
                <TableCell align="right">
                  <b>Type</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedMonsteMoves.map((moves, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" align="left">
                      {moves.name}
                    </TableCell>
                    <TableCell align="center">{moves.damage}</TableCell>
                    <TableCell align="right">
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <span style={{ textTransform: "capitalize" }}>
                          {getType(moves.typeOfMove)}
                        </span>
                        <img
                          src={`https://monsterimagesaws.s3.eu-central-1.amazonaws.com/${getType(
                            moves.typeOfMove
                          )}.png`}
                          alt="type"
                          className="typeIcon"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {userActiveMonster.id !== selectedMonster.id ? (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              className="button"
              style={{ marginTop: "1rem" }}
              onClick={() => callSetActiveMonster(selectedMonster.id)}
            >
              Set to active
            </Button>
          </div>
        ) : null}
      </DialogContent>

      <Dialog
        open={loadingSetActiveMonster}
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
        open={openSuccessSetActiveMonster}
        onClose={handleCloseSuccessSetActiveMonster}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#ccffcc',
          },
        }}>
        <DialogTitle id="alert-dialog-title" align="center">
          <h2>{"Active monster successfully changed"}</h2>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseSuccessSetActiveMonster} autoFocus>
            <h4>Close</h4>
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
