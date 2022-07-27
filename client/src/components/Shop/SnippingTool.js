import React, { useContext } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { DataContext } from "../../context/DataContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnippingTool() {

  const {
    buyNormalTool,
    buyMegaTool,
    buyUltraTool,
    openSuccess,
    setOpenSuccess,
    loadSnippingTool,
    setLoadSnippingTool
  } = useContext(DataContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };


  return (
    <div>
      <Typography
        variant="h5"
        style={{ marginBottom: "1rem", marginLeft: "1rem" }}
      >
        <b>Buy Your Snipping Tool</b>
      </Typography>
      <Grid container>
        <Grid item xs={4} align="center">
          <Card
            className="toolCard"
            sx={{
              minWidth: 205,
            }}
          >
            <CardContent align="center">
              <Typography
                variant="h6"
                align="center"
                style={{ marginBottom: "1rem" }}
              >
                <b>Normal</b>
              </Typography>
              <img
                src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/strumento+di+cattura+normal.png"
                alt="NormalTool"
                className="toolImg"
              />

              <Typography
                variant="body1"
                align="center"
                style={{ margin: "1rem 0" }}
              >
                <b>Chance of capture:</b> &nbsp; 30%
              </Typography>
              <div className="center">
                <Typography variant="body1" align="center">
                  <b>Price:</b>&nbsp; 0.005 MATIC
                </Typography>
                <img
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/maticlogo1.png"
                  alt="maticLogo"
                  className="maticLogo"
                />
              </div>
            </CardContent>
            <Button
              variant="contained"
              className="button"
              onClick={() => buyNormalTool()}
            >
              <Typography variant="body2">Buy</Typography>
            </Button>
          </Card>
        </Grid>

        <Grid item xs={4} align="center">
          <Card
            className="toolCard"
            sx={{
              minWidth: 205,
            }}
          >
            <CardContent align="center">
              <Typography
                variant="h6"
                align="center"
                style={{ marginBottom: "1rem" }}
              >
                <b>Mega</b>
              </Typography>
              <img
                src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/strumento+di+cattura+mega.png"
                alt="MegaTool"
                className="toolImg"
              />

              <Typography
                variant="body1"
                align="center"
                style={{ margin: "1rem 0" }}
              >
                <b>Chance of capture:</b> &nbsp; 60%
              </Typography>
              <div className="center">
                <Typography variant="body1" align="center">
                  <b>Price:</b>&nbsp; 0.006 MATIC
                </Typography>
                <img
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/maticlogo1.png"
                  alt="maticLogo"
                  className="maticLogo"
                />
              </div>
            </CardContent>
            <Button
              variant="contained"
              className="button"
              onClick={() => buyMegaTool()}
            >
              <Typography variant="body2">Buy</Typography>
            </Button>
          </Card>
        </Grid>

        <Grid item xs={4} align="center">
          <Card
            className="toolCard"
            sx={{
              minWidth: 205,
            }}
          >
            <CardContent align="center">
              <Typography
                variant="h6"
                align="center"
                style={{ marginBottom: "1rem" }}
              >
                <b>Ultra </b>
              </Typography>
              <img
                src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/strumento+di+cattura+ultra.png"
                alt="UltraTool"
                className="toolImg"
              />

              <Typography
                variant="body1"
                align="center"
                style={{ margin: "1rem 0" }}
              >
                <b>Chance of capture:</b> &nbsp; 90%
              </Typography>
              <div className="center">
                <Typography variant="body1" align="center">
                  <b>Price:</b>&nbsp; 0.007 MATIC
                </Typography>
                <img
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/maticlogo1.png"
                  alt="maticLogo"
                  className="maticLogo"
                />
              </div>
            </CardContent>
            <Button
              variant="contained"
              className="button"
              onClick={() => buyUltraTool()}
            >
              <Typography variant="body2">Buy</Typography>
            </Button>
          </Card>
        </Grid>
      </Grid>

      
      <Dialog
        open={loadSnippingTool}
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
        open={openSuccess}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#ccffcc',
          },
        }}>
        <DialogTitle id="alert-dialog-title" align="center">
          <h2>{"Tool bought successfully!"}</h2>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            <h4>Close</h4>
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  );
}
