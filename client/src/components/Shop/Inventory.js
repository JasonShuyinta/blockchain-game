import React, { useState, useContext } from "react";
import {
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Table,
  Grid,
} from "@mui/material";
import { DataContext } from "../../context/DataContext";

export default function Inventory() {
  const { userTools, userMonsters, getType, userActiveMonster } =
    useContext(DataContext);
  const [showMonster, setShowMonster] = useState(null);

  return (
    <div style={{ padding: "0 1rem" }}>
      <Typography variant="h5" style={{ marginBottom: "1rem" }}>
        <b>Inventory </b>{" "}
      </Typography>
      <Typography variant="h6"> Your items </Typography>
      <TableContainer
        component={Paper}
        className="table"
        style={{
          margin: "1rem 0",
        }}
      >
        <Table sx={{ minWidth: "450" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell align="center">
                <b>Image</b>
              </TableCell>
              <TableCell align="center">
                <b>Probability</b>
              </TableCell>
              <TableCell align="right">
                <b>Owned</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className="tableRow">
              <TableCell>
                <Typography variant="body1">Normal</Typography>
              </TableCell>
              <TableCell align="center">
                <img
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/strumento+di+cattura+normal.png"
                  alt="NormalTool"
                  style={{ width: "30px", height: "30px" }}
                />
              </TableCell>
              <TableCell align="center">30%</TableCell>
              <TableCell align="right">
                <Typography variant="body1">{userTools.normal}</Typography>
              </TableCell>
            </TableRow>
            <TableRow className="tableRow">
              <TableCell>
                <Typography variant="body1">Mega</Typography>
              </TableCell>
              <TableCell align="center">
                <img
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/strumento+di+cattura+mega.png"
                  alt="MegaTool"
                  style={{ width: "30px", height: "30px" }}
                />
              </TableCell>
              <TableCell align="center">60%</TableCell>
              <TableCell align="right">
                <Typography variant="body1">{userTools.mega}</Typography>
              </TableCell>
            </TableRow>
            <TableRow className="tableRow">
              <TableCell>
                <Typography variant="body1">Ultra</Typography>
              </TableCell>
              <TableCell align="center">
                <img
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/strumento+di+cattura+ultra.png"
                  alt="UltraTool"
                  style={{ width: "30px", height: "30px" }}
                />
              </TableCell>
              <TableCell align="center">90%</TableCell>
              <TableCell align="right">
                <Typography variant="body1">{userTools.ultra}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" style={{ marginTop: "3rem" }}>
        {" "}
        Your monsters{" "}
      </Typography>
      <Grid container>
        <Grid item xs={8}>
          <TableContainer
            component={Paper}
            className="table"
            style={{
              margin: "1rem 0",
            }}
          >
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
                        onClick={() => setShowMonster(userMonster)}
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
                              alt="userMonster"
                              className="typeIcon"
                            />
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
                            style={{ width: "50px", height: "50px" }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              }
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={4}>
          {showMonster && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <img
                src={showMonster.urlImg}
                alt={showMonster.name}
                style={{ width: "150px", height: "150px" }}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
