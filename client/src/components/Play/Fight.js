import React, { useContext } from "react";
import {
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { DataContext } from "../../context/DataContext";

export default function Fight() {
  const {
    getRandomUserToFight,
    randomUserToFight,
    opponentUserData,
    userActiveMonster,
    getActiveMonsterMoves,
    activeMonsterMoves,
    loadingFight,
    startFight,
    openWin,
    setOpenWin,
    openLose,
    setOpenLose,
  } = useContext(DataContext);

  const handleCloseWin = () => {
    setOpenWin(false);
  };

  const handleCloseLose = () => {
    setOpenLose(false);
  };

  //getActiveMonsterMoves();
  return (
    <>
      <div align="center">

        {randomUserToFight ? (
          <div style={{
            paddingTop: "2rem",
            filter: loadingFight ? "blur(4px)" : "none",
          }}>
            <Box sx={{ flexGrow: 1, marginTop: "6rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h4" component="div" align="center">
                        Name: {randomUserToFight?.username}
                        <br />
                        Level: {randomUserToFight?.userLevel}
                        <br />
                        Victories: {randomUserToFight?.userVictories} <br />
                        Losses: {randomUserToFight?.userLosses} <br />
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h4" component="div" align="center">
                        Monster name: {opponentUserData?.monsterName}
                        <br />
                        Monster level: {opponentUserData?.monsterLevel}
                        <br />
                        Monster type: {opponentUserData?.monsterType} <br />
                        Monster health points:{" "}
                        {opponentUserData?.monsterHealthPoints} <br />
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {console.log(userActiveMonster?.url)}

            <Box sx={{ flexGrow: 1, marginTop: "6rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent style={{ textAlign: "center" }}>
                      <img
                        src={userActiveMonster?.url}
                        alt={userActiveMonster?.name}
                        style={{ width: "30%" }} />
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={2}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent style={{ textAlign: "center" }}>
                      <img
                        src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/vs.jpeg"
                        alt="VS"
                        style={{ width: "30%" }} />
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={5}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent style={{ textAlign: "center" }}>
                      <img
                        src={opponentUserData.monsterUrlImg}
                        alt={opponentUserData.monsterName}
                        style={{ width: "30%" }} />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent align="center">
                      <div style={{ display: "flex" }}>
                        {activeMonsterMoves.map((moves, index) => (
                          <Button
                            className="button"
                            key={index}
                            style={{ margin: "auto" }}
                            variant="contained"
                            color="primary"
                            onClick={() => startFight(randomUserToFight?.userAddress, index)}
                          >
                            <Typography variant="h6" component="div">
                              Name: {moves?.name}
                              <br />
                              Damege: {moves?.damage}
                              <br />
                              Type: {moves?.typeOfMove} <br />
                            </Typography>
                          </Button>
                        ))}
                        ;
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </div>
        ) : (
          <div style={{
            paddingTop: "2rem",
            filter: loadingFight ? "blur(4px)" : "none",
          }} align="center">

            <Grid container className="CatchGrid1">
              <Grid item xs={12} style={{ padding: "1rem 2rem" }}>
                <h1> Fight </h1>
              </Grid>
              <Grid item xs={12} style={{ padding: "1rem 2rem" }}>
                <Button
                  className="button"
                  onClick={() => {
                    getRandomUserToFight();
                    getActiveMonsterMoves();
                  }}
                  variant="contained"
                >
                  Search for a player
                </Button>
              </Grid>
            </Grid>
          </div>
        )}
      </div>


      <Dialog
        open={loadingFight}
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
        open={openWin}
        onClose={handleCloseWin}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#ccffcc', // #66ff66
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" align="center">
          <h2>{"YOU WIN!!! 🥳"}</h2>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" >
            <h3>Congratulations, you win the fight </h3>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWin} autoFocus>
            <h4>Close</h4>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openLose}
        onClose={handleCloseLose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#ffcccc',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" align="center">
          <h2>{"YOU LOSE 🤕"}</h2>
        </DialogTitle>
        <DialogContent padding="2px">
          <DialogContentText id="alert-dialog-description">
            <h3>You lose, strengthen your monster 💪.</h3>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLose} autoFocus>
            <h4>Close </h4>
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
