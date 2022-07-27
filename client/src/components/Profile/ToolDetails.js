import {
  Card,
  CardContent,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function ToolDetails({ selectedTool, userTools, getToolInfo }) {
  function getOwnedTools(tool) {
    var num;
    switch (tool) {
      case "normal":
        num = userTools.normal;
        break;
      case "mega":
        num = userTools.mega;
        break;
      case "ultra":
        num = userTools.ultra;
        break;
      default:
        break;
    }
    return num;
  }

  return (
    <div style={{ padding: "1rem", width: "800px" }}>
      <DialogTitle>
        <span>Details</span>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={7}>
            <Card sx={{ border: "1px solid #e0e0e0", borderRadius: "10px" }}>
              <CardContent style={{ padding: "0.5rem" }}>
                <List>
                  <ListItem>
                    <ListItemText primary="Name" />
                    <ListItemText align="right" secondary={selectedTool} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Probability" />
                    <ListItemText
                      align="right"
                      secondary={`${getToolInfo(selectedTool)}%`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Owned" />
                    <ListItemText
                      align="right"
                      secondary={getOwnedTools(selectedTool)}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={5}
            className="center"
            style={{
              alignItems: "center",
            }}
          >
            <img
              src={`https://monsterimagesaws.s3.eu-central-1.amazonaws.com/strumento+di+cattura+${selectedTool}.png`}
              alt="tool"
              style={{ width: "150px", height: "150px" }}
            />
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "2rem",
          }}
        >
          <Button
            variant="contained"
            className="button"
            component={Link}
            to="/shop"
          >
            Go to shop
          </Button>
        </div>
      </DialogContent>
    </div>
  );
}
