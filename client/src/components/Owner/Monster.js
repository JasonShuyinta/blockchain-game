import React, { useContext, useState } from "react";
import {
    Grid,
    TextField,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogActions,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    CircularProgress
} from "@mui/material";

import { DataContext } from "../../context/DataContext";
import { BsCardImage } from "react-icons/bs";
import aws from "aws-sdk";

const ACCESSKEYID = process.env.REACT_APP_ACCESSKEYID;
const SECRETKEY = process.env.REACT_APP_SECRETKEY;
const BUCKETNAME = process.env.REACT_APP_BUCKETNAME;
const REGION = process.env.REACT_APP_REGION;

aws.config.update({ region: REGION });
const s3 = new aws.S3({ accessKeyId: ACCESSKEYID, secretAccessKey: SECRETKEY });

export default function Monster() {
    const {
        currentAccount,
        createMonster,
        createMonsterSuccess,
        setCreateMonsterSuccess,
        getType,
        findableMonster,
        allStarters,
        loadingAddNewMonster,
    } = useContext(DataContext);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setCreateMonsterSuccess(false);
    };

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [healthPoints, setHealthPoints] = useState("");
    const [moveName, setMoveName] = useState("");
    const [moveType, setMoveType] = useState("");
    const [moveDamage, setMoveDamage] = useState("");
    const [arrayBuffer, setArrayBuffer] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [file, setFile] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [whitdrawAmount, setWhitdrawAmount] = useState(0);

    const handleMonsterImage = (e) => {
        setFile(e.target.files[0]);
        setThumbnail(URL.createObjectURL(e.target.files[0]));
        var reader = new FileReader();
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.onload = function (e) {
            setArrayBuffer(reader.result);
        };
    };

    const addMonster = () => {
        let myFile = file.name.split(".");
        const fileType = myFile[myFile.length - 1];
        const fileName = `${name}.${fileType}`;
        const params = {
            Bucket: BUCKETNAME,
            Key: fileName,
            Body: arrayBuffer,
        };

        s3.upload(params, (error, data) => {
            if (error) console.log(error);
            else {
                createMonster(name, type, healthPoints, data.Location, moveName, moveDamage, moveType);
                setImageUrl(data.Location);
            }
        }).on("httpUploadProgress", function (evt) {
            if (parseInt((evt.loaded * 100) / evt.total) === 0)
                console.log("Upload completato");
        });
    };

    const uploadNewMonster = () => {
        setImageUrl("");
        setFile("");
        setThumbnail("");
        setName("");
        setType("");
        setMoveName("");
        setMoveDamage("");
        setMoveType("");
        setHealthPoints("");
        setArrayBuffer("");
    };

    const { getAmountByOwner, amount, whitdrawAmountByOwner } =
        useContext(DataContext);
    return (
        <div style={{ padding: "0 1rem" }}>
            <Typography
                variant="h4"
                align="center"
                style={{ marginBottom: "1rem" }}
            >
                <b>Add new monster</b>
            </Typography>
            <div align="center">
                <Grid container className="OwnerGrid">
                    <Grid item xs={6} style={{ padding: "1rem 2rem" }}>
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            label="Type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            label="Health Points"
                            value={healthPoints}
                            onChange={(e) => setHealthPoints(e.target.value)}
                            variant="outlined"
                            fullWidth
                            type="number"
                            style={{ marginBottom: "1rem" }}
                        />

                        <TextField
                            label="Move Name"
                            value={moveName}
                            onChange={(e) => setMoveName(e.target.value)}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            label="Move Damage"
                            value={moveDamage}
                            onChange={(e) => setMoveDamage(e.target.value)}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            label="Move Type"
                            value={moveType}
                            onChange={(e) => setMoveType(e.target.value)}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: "1rem" }}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ padding: "1rem 2rem" }}>
                        <div
                            style={{
                                borderRadius: "10px",
                                border: "1px solid black",
                                width: "100%",
                                height: "100%",
                                textAlign: "center",
                                top: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                        >
                            {thumbnail ? (
                                <div style={{ width: "150px", height: "150px" }}>
                                    <img
                                        src={thumbnail}
                                        alt="thumbnail"
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                            ) : (
                                <>
                                    <label htmlFor="file-input">
                                        <BsCardImage
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                cursor: "pointer",
                                            }}
                                        />
                                    </label>
                                    <input
                                        type="file"
                                        multiple={false}
                                        id="file-input"
                                        accept="image/png, image/jpeg"
                                        style={{ display: "none" }}
                                        onChange={(e) => handleMonsterImage(e)}
                                    />
                                </>
                            )}
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{ textAlign: "center", paddingTop: "1rem" }}
                    >
                        {imageUrl ? (
                            <>
                                <h5>Upload completed!</h5>
                                <Button
                                    className="button"
                                    variant="contained"
                                    onClick={() => uploadNewMonster()}
                                >
                                    Upload new monster
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                className="button"
                                onClick={() => addMonster()}
                            >
                                Add Monster
                            </Button>
                        )}
                    </Grid>
                </Grid>

                <Typography
                    variant="h4"
                    align="center"
                    style={{ marginBottom: "1rem", marginTop: "3rem" }}
                >
                    <b>List of monsters</b>
                </Typography>

                <Grid container className="OwnerGrid">
                    <Grid item xs={12} style={{ padding: "1rem 2rem" }}>
                        <TableContainer component={Paper} className="table">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <b>Name</b>
                                        </TableCell>
                                        <TableCell align="center">
                                            {" "}
                                            <b> Type </b>{" "}
                                        </TableCell>
                                        <TableCell align="center">
                                            {" "}
                                            <b> Health Points </b>
                                        </TableCell>
                                        <TableCell align="center">
                                            {" "}
                                            <b> Monster Image </b>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allStarters.map((allStarters, index) => (
                                        <TableRow key={index} className="tableRow">
                                            <TableCell component="th" scope="row">
                                                {allStarters.name}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{ textTransform: "capitalize" }}
                                            >
                                                {" "}
                                                <div className="center">
                                                    <Typography variant="body1">
                                                        {getType(allStarters.typeOfMonster)}
                                                    </Typography>
                                                    <img
                                                        src={`https://monsterimagesaws.s3.eu-central-1.amazonaws.com/${getType(
                                                            allStarters.typeOfMonster
                                                        )}.png`}
                                                        alt="type"
                                                        className="typeIcon"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell align="center">{allStarters.healthPoints}</TableCell>
                                            <TableCell align="center">
                                                <img
                                                    src={allStarters?.urlImg}
                                                    alt={allStarters.name}
                                                    style={{ width: "60px", height: "60px" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {findableMonster.map((findableMonster, index) => (
                                        <TableRow key={index} className="tableRow">
                                            <TableCell component="th" scope="row">
                                                {findableMonster.name}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{ textTransform: "capitalize" }}
                                            >
                                                {" "}
                                                <div className="center">
                                                    <Typography variant="body1">
                                                        {getType(findableMonster.typeOfMonster)}
                                                    </Typography>
                                                    <img
                                                        src={`https://monsterimagesaws.s3.eu-central-1.amazonaws.com/${getType(
                                                            findableMonster.typeOfMonster
                                                        )}.png`}
                                                        alt="type"
                                                        className="typeIcon"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell align="center">{findableMonster.healthPoints}</TableCell>
                                            <TableCell align="center">
                                                <img
                                                    src={findableMonster?.urlImg}
                                                    alt={findableMonster.name}
                                                    style={{ width: "60px", height: "60px" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </div>
            <Dialog
                open={createMonsterSuccess}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        backgroundColor: '#ccffcc',
                    },
                }}>
                <DialogTitle id="alert-dialog-title" align="center">
                    <h2>{"Add new monster"}</h2>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        <h4>Close</h4>
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={loadingAddNewMonster}
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