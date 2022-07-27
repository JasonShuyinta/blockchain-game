import React, { useContext, useState } from "react";
import {
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
import Monster from "./Monster";
import Move from "./Move";
import Withdraw from "./Withdraw";

const drawerWidth = 240;
export default function Owner() {
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
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/Firemonster.png"
                  alt="Monster"
                  style={{ width: "20px", height: "20px" }}
                />
              </ListItemIcon>
              <ListItemText primary="Monster" />
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
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/attack.png"
                  alt="Move"
                  style={{ width: "20px", height: "20px" }}
                />
              </ListItemIcon>
              <ListItemText primary="Move" />
            </ListItem>
            <Divider />
            <ListItem
              className="drawerListItem"
              onClick={() => setSection(2)}
              style={{
                backgroundColor: section === 3 ? "rgb(230, 230, 230)" : "white",
              }}
            >
              <ListItemIcon>
                <img
                  src="https://monsterimagesaws.s3.eu-central-1.amazonaws.com/withdraw.png"
                  alt="Withdraw"
                  style={{ width: "20px", height: "20px" }}
                />
              </ListItemIcon>
              <ListItemText primary="Withdraw" />
            </ListItem>
            <Divider />
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
          <Monster />
          <Move />
          <Withdraw />
        </SwipeableViews>
      </div>
    </div>
  );
}