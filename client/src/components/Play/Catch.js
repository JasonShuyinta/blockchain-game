import React, { useContext } from "react";
import {
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { DataContext } from "../../context/DataContext";

export default function Catch() {
  const {
    getRandomMonsterToCatch,
    randomMonsterToCatch,
    tryToCatch,
    userTools,
    loadingCatch,
    disableCatchButton,
    openWinCatch,
    setOpenWinCatch,
    openLoseCatch,
    setOpenLoseCatch,
  } = useContext(DataContext);

  const handleCloseWinCatch = () => {
    setOpenWinCatch(false);
    window.location.reload(false)
  };

  const handleCloseLoseCatch = () => {
    setOpenLoseCatch(false);
  };

  return (
    <><div align="center">
      {randomMonsterToCatch.name ? (
        <div style={{
          paddingTop: "2rem",
          filter: loadingCatch ? "blur(4px)" : "none",
        }} align="center">
          <Box sx={{ flexGrow: 1 }}>
            <Grid item xs={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent align="center">
                  <Typography variant="h6" component="div" align="center">
                    You found {randomMonsterToCatch.name}
                  </Typography>

                  <img
                    src={randomMonsterToCatch.url}
                    alt={randomMonsterToCatch.name} />
                  <Typography variant="body1" component="div" align="center">
                    Type: {randomMonsterToCatch.type}
                  </Typography>
                  <Typography variant="body1" component="div" align="center">
                    healthPoints: {randomMonsterToCatch.healthPoints}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Box>
          <Button
            disabled={disableCatchButton}
            className="button"
            onClick={() => getRandomMonsterToCatch()}
            variant="contained"
          >
            Find another monster to catch
          </Button>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent align="center">
                    <img
                      src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/strumento+di+cattura+normal.png"
                      alt="NormalTool"
                      style={{ width: "30%" }} />
                    <Typography variant="h6" component="div" align="center">
                      Normal Snipping Tool
                    </Typography>

                    <Typography
                      variant="body1"
                      component="div"
                      align="center"
                    >
                      You have {userTools.normal}
                    </Typography>
                  </CardContent>
                  <Box textAlign="center" sx={{ mb: 1 }}>
                    {userTools.normal < 1 ? (
                      <p>
                        {" "}
                        Può acquistare gli strumenti di cattura nella sezione
                        Shop
                      </p>
                    ) : (
                      <Button
                        disabled={disableCatchButton}
                        className="button"
                        variant="contained"
                        onClick={() => tryToCatch(0)}
                      >
                        <Typography variant="body1">
                          Use Normal Snipping Tool
                        </Typography>
                      </Button>
                    )}
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={4}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent align="center">
                    <img
                      src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/strumento+di+cattura+mega.png"
                      alt="MegaTool"
                      style={{ width: "30%" }} />
                    <Typography variant="h6" component="div" align="center">
                      Mega Snipping Tool
                    </Typography>

                    <Typography
                      variant="body1"
                      component="div"
                      align="center"
                    >
                      You have {userTools.mega}
                    </Typography>
                  </CardContent>
                  <Box textAlign="center" sx={{ mb: 1 }}>
                    {userTools.mega < 1 ? (
                      <p>
                        {" "}
                        Può acquistare gli strumenti di cattura nella sezione
                        Shop
                      </p>
                    ) : (
                      <Button
                        disabled={disableCatchButton}
                        className="button"
                        variant="contained"
                        onClick={() => tryToCatch(1)}
                      >
                        <Typography variant="body1">
                          Use Mega Snipping Tool
                        </Typography>
                      </Button>
                    )}
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={4}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent align="center">
                    <img
                      src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/strumento+di+cattura+ultra.png"
                      alt="UltraTool"
                      style={{ width: "30%" }} />
                    <Typography variant="h6" component="div" align="center">
                      Ultra Snipping Tool
                    </Typography>

                    <Typography
                      variant="body1"
                      component="div"
                      align="center"
                    >
                      You have {userTools.ultra}
                    </Typography>
                  </CardContent>
                  <Box textAlign="center" sx={{ mb: 1 }}>
                    {userTools.ultra < 1 ? (
                      <p>
                        {" "}
                        Può acquistare gli strumenti di cattura nella sezione
                        Shop
                      </p>
                    ) : (
                      <Button
                        disabled={disableCatchButton}
                        className="button"
                        variant="contained"
                        onClick={() => tryToCatch(2)}
                      >
                        <Typography variant="body1">
                          Use Ultra Snipping Tool
                        </Typography>
                      </Button>
                    )}
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
      ) : (
        <div
          style={{
            paddingTop: "2rem",
            filter: loadingCatch ? "blur(4px)" : "none",
          }} align="center">
          <Grid container className="CatchGrid1">
            <Grid item xs={12} style={{ padding: "1rem 2rem" }}>
              <h1>Try to catch a monster</h1>
            </Grid>
            <Grid item xs={12} style={{ padding: "1rem 2rem" }}>
              <Button
                className="button"
                onClick={() => getRandomMonsterToCatch()}
                variant="contained"
              >
                Find a monster
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
      <Dialog
        open={loadingCatch}
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
        open={openWinCatch}
        onClose={handleCloseWinCatch}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#ccffcc',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" align="center">
          <h2>{"MONSTER CAUGHT !!! 🤩"}</h2>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h3>Congratulations, capture complete</h3>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWinCatch} autoFocus>
            <h4>Close</h4>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openLoseCatch}
        onClose={handleCloseLoseCatch}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#ffcccc',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" align="center">
          <h2>{"Capture failed 😥"}</h2>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h3>Capture failed, try again</h3>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLoseCatch} autoFocus>
            <h4>Close</h4>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
