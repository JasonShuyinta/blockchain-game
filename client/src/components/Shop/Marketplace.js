import {
  TableCell,
  TableContainer,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";

export default function Marketplace() {
  const { monstersOnSale, getType, easyAddress } = useContext(DataContext);
  return (
    <div style={{ padding: "0 1rem" }}>
      <Typography variant="h5" style={{ marginBottom: "1rem" }}>
        <b>Marketplace</b>
      </Typography>
      <Typography variant="h6" style={{ margin: "1rem 0" }}>
        Monsters on sale
      </Typography>
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
                <b>Health Points</b>
              </TableCell>
              <TableCell align="center">
                <b>Level</b>
              </TableCell>
              <TableCell align="center">
                <b>Owner</b>
              </TableCell>
              <TableCell align="center">
                <b>Price</b>
              </TableCell>
              <TableCell align="center">
                <b>Image</b>
              </TableCell>
            </TableRow>
          </TableHead>

          {
            <TableBody>
              {monstersOnSale.map((monster) => (
                <TableRow key={monster.id} style={{ cursor: "pointer" }}>
                  <TableCell component="th" scope="row">
                    {monster.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}
                  >
                    <div className="center">
                      {getType(monster.type)}
                      <img
                        src={`https://monsterimagesaws.s3.eu-central-1.amazonaws.com/${getType(
                          monster.type
                        )}.png`}
                        alt="type"
                        className="typeIcon"
                      />
                    </div>
                  </TableCell>
                  <TableCell align="center">{monster.healthPoints}</TableCell>
                  <TableCell align="center">{monster.level}</TableCell>
                  <TableCell align="center">
                    {easyAddress(monster.owner)}
                  </TableCell>
                  <TableCell align="center">
                    <div className="center">
                      <Typography variant="body1">
                        {monster.price} MATIC
                      </Typography>
                      <img
                        src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/maticlogo1.png"
                        alt="maticLogo"
                        className="maticLogo"
                      />
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={monster.url}
                      alt={monster.name}
                      style={{ width: "40px", height: "40px" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          }
        </Table>
      </TableContainer>
    </div>
  );
}
