import React, { useContext } from "react";
import {
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Table,
} from "@mui/material";
import { DataContext } from "../../context/DataContext";

export default function Homepage() {
  const { user, userActiveMonster, getType, easyAddress, currentAccount } =
    useContext(DataContext);

  return (
    <div style={{ marginTop: "3rem", padding: "3rem" }}>
      <TableContainer component={Paper} className="table">
        <Table fullwidth="true">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>Account</b>
              </TableCell>
              <TableCell align="center">
                <b>Level</b>
              </TableCell>
              <TableCell align="center">
                <b>Victories/Losses</b>
              </TableCell>
              <TableCell align="center">
                <b>Active monster</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                {user.username}
                <br></br>
                {easyAddress(currentAccount)}
              </TableCell>
              <TableCell align="center">{user.userLevel}</TableCell>
              <TableCell align="center">
                {user.userVictories}/{user.userLosses}
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">
                  {userActiveMonster.name}
                </Typography>
                <img
                  src={userActiveMonster?.url}
                  alt={userActiveMonster.name}
                  style={{ width: "60px", height: "60px" }}
                />
                <div className="center">
                  <Typography variant="body1">
                    Lvl. {userActiveMonster.level}
                  </Typography>
                  <img
                    src={`https://monsterimagesaws.s3.eu-central-1.amazonaws.com/${getType(
                      userActiveMonster.type
                    )}.png`}
                    alt="type"
                    className="typeIcon"
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
