import React, { useContext, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  CircularProgress
} from "@mui/material";
import { DataContext } from "../../context/DataContext";

export default function Withdraw() {
  const [whitdrawAmount, setWhitdrawAmount] = useState(0);
  const {
    getAmountByOwner,
    amount,
    whitdrawAmountByOwner,
    withdrawSuccess,
    setWithdrawSuccess,
    loadingWhitdraw
  } = useContext(DataContext);

  const handleCloseWithdrawSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setWithdrawSuccess(false);
  };

  return (
    <div style={{ padding: "0 1rem" }}>
      <Typography
        variant="h4"
        align="center"
        style={{ marginBottom: "1rem" }}
      >
        <b>Withdraw</b>
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} align="center">
          <Grid item xs={6}>
            <Card sx={{ minWidth: 275 }} className="withdrawGrid">
              <CardContent align="center">
                <Typography variant="h6" component="div" align="center">
                  Amount: <br /> {amount}
                </Typography>
                <Button
                  className="button"
                  variant="contained"
                  onClick={() => getAmountByOwner()}
                >
                  Get Amount
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} >
            <Card sx={{ minWidth: 275 }} className="withdrawGrid">
              <CardContent align="center">
                <TextField
                  value={whitdrawAmount}
                  onChange={(e) => setWhitdrawAmount(e.target.value)}
                  label="MATIC"
                  variant="outlined"
                  style={{ margin: "0.5rem" }}
                />{" "}
                <br />
                <Button
                  className="button"
                  variant="contained"
                  onClick={() => whitdrawAmountByOwner(whitdrawAmount)}
                >
                  Whitdraw
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={withdrawSuccess}
        onClose={handleCloseWithdrawSuccess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#ccffcc',
          },
        }}>
        <DialogTitle id="alert-dialog-title" align="center">
          <h2>{"Withdraw with success"}</h2>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseWithdrawSuccess} autoFocus>
            <h4>Close</h4>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={loadingWhitdraw}
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