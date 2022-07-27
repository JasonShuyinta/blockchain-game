import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper,
  Typography,
  Dialog,
} from "@mui/material";
import MonsterDetails from "./MonsterDetails";
import ToolDetails from "./ToolDetails";

const tools = ["normal", "mega", "ultra"];

export default function Profile() {
  const {
    user,
    easyAddress,
    currentAccount,
    maticBalance,
    userMonsters,
    getType,
    getSelectedMonsterMoves,
    userTools,
    userActiveMonster,
  } = useContext(DataContext);

  const [openMonsterDetails, setOpenMonsterDetails] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [openToolDetails, setOpenToolDetails] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

  const handleCloseMonsterDetails = () => {
    setOpenMonsterDetails(false);
  };

  const handleCloseToolDetails = () => {
    setOpenToolDetails(false);
  };

  const handleOpenDetails = (monster) => {
    setOpenMonsterDetails(true);
    setSelectedMonster(monster);
    getSelectedMonsterMoves(monster.id);
  };

  const handleOpenToolDetail = (tool) => {
    setOpenToolDetails(true);
    setSelectedTool(tool);
  };

  const getToolInfo = (tool) => {
    switch (tool) {
      case "normal":
        return "30";
      case "mega":
        return "60";
      case "ultra":
        return "90";
    }
  };

  return (
    <div style={{ marginTop: "6rem", padding: "0 2rem" }}>
      <TableContainer component={Paper} className="table">
        <Table fullwidth="true">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>Account</b>
              </TableCell>
              <TableCell align="center">
                <b>Balance</b>
              </TableCell>
              <TableCell align="center">
                <b>Level</b>
              </TableCell>
              <TableCell align="center">
                <b>Victories/Losses</b>
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
              <TableCell align="center">
                <div className="center">
                  <Typography variant="body1">{maticBalance}</Typography>
                  <img
                    src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/maticlogo1.png"
                    alt="maticLogo"
                    className="maticLogo"
                  />
                </div>
              </TableCell>
              <TableCell align="center">{user.userLevel}</TableCell>
              <TableCell align="center">
                {user.userVictories}/{user.userLosses}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" style={{ marginTop: "3rem" }}>
        Your Monsters
      </Typography>
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
                <b>Health Points</b>
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
                    onClick={() => handleOpenDetails(userMonster)}
                  >
                    <TableCell component="th" scope="row">
                      {userMonster.name}
                      {userActiveMonster.id === userMonster.id ? (
                        <span
                          style={{ marginLeft: "0.5rem", fontSize: "smaller" }}
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
                    <TableCell align="center">{userMonster.level}</TableCell>
                    <TableCell align="center">
                      <img
                        src={userMonster.urlImg}
                        alt={userMonster.name}
                        style={{ width: "40px", height: "40px" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          }
        </Table>
      </TableContainer>

      <Typography variant="h5" style={{ marginTop: "3rem" }}>
        Your snipping tools
      </Typography>

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
            {tools.map((tool, index) => {
              return (
                <TableRow
                  className="tableRow"
                  key={index}
                  onClick={() => handleOpenToolDetail(tool)}
                >
                  <TableCell>
                    <span style={{ textTransform: "capitalize" }}>{tool}</span>
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={`https://monsterimagesaws.s3.eu-central-1.amazonaws.com/strumento+di+cattura+${tool}.png`}
                      alt="tool"
                      style={{ width: "30px", height: "30px" }}
                    />
                  </TableCell>
                  <TableCell align="center">{getToolInfo(tool)}%</TableCell>
                  <TableCell align="right">
                    <Typography variant="body1">
                      {index === 0
                        ? userTools.normal
                        : index === 1
                        ? userTools.mega
                        : index === 2
                        ? userTools.ultra
                        : ""}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        scroll="paper"
        open={openMonsterDetails}
        onClose={handleCloseMonsterDetails}
        maxWidth="lg"
      >
        <MonsterDetails selectedMonster={selectedMonster} />
      </Dialog>

      <Dialog
        scroll="paper"
        open={openToolDetails}
        onClose={handleCloseToolDetails}
        maxWidth="lg"
      >
        <ToolDetails
          selectedTool={selectedTool}
          userTools={userTools}
          getToolInfo={getToolInfo}
        />
      </Dialog>
    </div>
  );
}
