import React, { useContext } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { DataContext } from "../../context/DataContext";

export default function MonsterSelection() {
  const {
    starters,
    selectMonster,
    getType,
    setLoadingMonsterSelection,
    loadingMonsterSelection,
  } = useContext(DataContext);

  const handleSelectMonster = (monster) => {
    setLoadingMonsterSelection(true);
    selectMonster(monster);
  };

  return (
    <>
      <div
        style={{
          marginTop: "4rem",
          paddingTop: "1rem",
          filter: loadingMonsterSelection ? "blur(4px)" : "none",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h5"
            style={{ margin: "2rem", textAlign: "center" }}
          >
            Select a monster to start your adventure!
          </Typography>
          <Grid container spacing={2}>
            {starters.map((starter, index) => {
              return (
                // Dopo aver cliccato il pulsante per scegliere il mostro, caricare la homepage
                <Grid item xs={4} key={index} align="center">
                  <Card
                    sx={{ minWidth: 275, maxWidth: 400 }}
                    style={{
                      border: "1px solid #e0e0e0",
                      backgroundColor: "rgb(241, 241, 241)",
                      padding: "2rem 0",
                    }}
                  >
                    <CardContent align="center">
                      <Typography variant="h4" align="center">
                        <b>{starter.name}</b>
                      </Typography>
                      <img
                        src={starter?.urlImg}
                        alt={starter.name}
                        style={{
                          width: "40%",
                        }}
                      />
                      <div
                        className="center"
                        style={{
                          margin: "1rem 0",
                        }}
                      >
                        <Typography
                          variant="h5"
                          align="center"
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          {getType(starter.typeOfMonster)}
                        </Typography>
                        <img
                          src={`https://monsterimagesaws.s3.eu-central-1.amazonaws.com/${getType(
                            starter.typeOfMonster
                          )}.png`}
                          alt="type"
                          className="typeIcon"
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      </div>
                      <Typography variant="h6">Level: 1</Typography>
                    </CardContent>
                    <Box textAlign="center" sx={{ mb: 1 }}>
                      <Button
                        variant="contained"
                        onClick={() => handleSelectMonster(starter)}
                        style={{ width: "30%" }}
                        className="button"
                      >
                        <Typography variant="h5">Choose</Typography>
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </div>

      <Dialog
        open={loadingMonsterSelection}
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
