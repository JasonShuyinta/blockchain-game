import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { DataContext } from "../../context/DataContext";
import SnippingTool from "./SnippingTool";
import Upgrade from "./Upgrade";
import Sell from "./Sell";
import Inventory from "./Inventory";
import Marketplace from "./Marketplace";

const drawerWidth = 240;
export default function Shop() {
  const { user, currentAccount, maticBalance, easyAddress } =
    useContext(DataContext);
  const [section, setSection] = useState(0);

  return (
    <div style={{ margin: "6rem 0" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "4rem",
          },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          {user && (
            <Card
              sx={{
                padding: "0.2rem",
                paddingBottom: "0.2rem",
                margin: "1rem",
                border: "1px solid #E0E0E0",
                borderRadius: "10px",
              }}
            >
              <CardContent align="center">
                <Typography variant="h5" style={{ marginBottom: "0.5rem" }}>
                  {user.username}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: "0.5rem" }}>
                  {easyAddress(currentAccount)}
                </Typography>
                <div className="center">
                  <Typography variant="body1">{maticBalance} MATIC</Typography>
                  <img
                    src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/maticlogo1.png"
                    alt="maticLogo"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginLeft: "0.3rem",
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}
          <List>
            <ListItem
              className="drawerListItem"
              onClick={() => setSection(0)}
              style={{
                backgroundColor: section === 0 ? "rgb(230, 230, 230)" : "white",
              }}
            >
              <ListItemIcon>
                <img
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/strumento+di+cattura+normal.png"
                  alt="NormalTool"
                  style={{ width: "20px", height: "20px" }}
                />
              </ListItemIcon>
              <ListItemText primary="Snipping Tools" />
            </ListItem>
            <Divider />
            <ListItem
              className="drawerListItem"
              onClick={() => setSection(1)}
              style={{
                backgroundColor: section === 1 ? "rgb(230, 230, 230)" : "white",
              }}
            >
              <ListItemIcon>
                <img
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/eth.png"
                  alt="Sell"
                  style={{ width: "20px", height: "20px" }}
                />
              </ListItemIcon>
              <ListItemText primary="Sell" />
            </ListItem>
            <Divider />
            <ListItem
              className="drawerListItem"
              onClick={() => setSection(2)}
              style={{
                backgroundColor: section === 2 ? "rgb(230, 230, 230)" : "white",
              }}
            >
              <ListItemIcon>
                <img
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/powerup.png"
                  alt="Upgrade"
                  style={{ width: "20px", height: "20px" }}
                />
              </ListItemIcon>
              <ListItemText primary="Upgrade" />
            </ListItem>
            <Divider />
            <ListItem
              className="drawerListItem"
              onClick={() => setSection(3)}
              style={{
                backgroundColor: section === 3 ? "rgb(230, 230, 230)" : "white",
              }}
            >
              <ListItemIcon>
                <img
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/inventory.png"
                  alt="Inventory"
                  style={{ width: "20px", height: "20px" }}
                />
              </ListItemIcon>
              <ListItemText primary="Inventory" />
            </ListItem>
            <Divider />
            <ListItem
              className="drawerListItem"
              onClick={() => setSection(4)}
              style={{
                backgroundColor: section === 4 ? "rgb(230, 230, 230)" : "white",
              }}
            >
              <ListItemIcon>
                <img
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/marketplace.png"
                  alt="Marketplace"
                  style={{ width: "20px", height: "20px" }}
                />
              </ListItemIcon>
              <ListItemText primary="Marketplace" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <div style={{ marginLeft: `${drawerWidth}px` }}>
        <SwipeableViews
          index={section}
          onChangeIndex={(index) => {
            setSection(index);
          }}
          id="swipeable-view"
        >
          <SnippingTool />
          <Sell />
          <Upgrade />
          <Inventory />
          <Marketplace />
        </SwipeableViews>
      </div>
    </div>
  );
}
