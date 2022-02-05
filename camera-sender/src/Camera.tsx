import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NstrumentaClient } from 'nstrumenta';
import React from "react";
import Webcam from "react-webcam";
import './App.css';

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
  facingMode: FACING_MODE_USER
};

const Camera = () => {

  const [qty, setQty] = React.useState(null);
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const nstClientRef = React.useRef<NstrumentaClient>(null);
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc);
    const data = imageSrc.split(',')[1];
    nstClientRef.current?.sendBuffer('preprocessing', Uint8Array.from(atob(data), (c) => c.charCodeAt(0)))
  }, [webcamRef, setImgSrc]);


  React.useEffect(() => {
    if (qty && !isNaN(qty)) {
      const interval = setInterval(() => {
        capture();
      }, (qty * 1000));
      return () => clearInterval(interval);
    }
  }, [qty]);

  const handleClick = React.useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }, []);

  React.useEffect(() => {

    const wsUrlParam = new URLSearchParams(window.location.search).get("wsUrl");

    const wsUrl = wsUrlParam ? wsUrlParam : window.location.origin.replace('http', 'ws');

    nstClientRef.current = new NstrumentaClient({
      apiKey: "",
      wsUrl,
    });

    nstClientRef.current.init()
  }, [])

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Camera Sender
          </Typography>
          <Button color='inherit' variant='outlined' onClick={capture}>Capture photo</Button>
          <Button color='inherit' variant='outlined' onClick={handleClick}> Switch View</Button>
          <input placeholder="Enter Interval Here" onBlur={(e) => { setQty(Number.parseFloat(e.target.value)) }} />
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Webcam
            width={'100%'}
            audio={false}
            ref={webcamRef}
            forceScreenshotSourceSize={false}
            screenshotFormat="image/png"
            videoConstraints={{
              ...videoConstraints, facingMode
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {imgSrc && (
            <img
              src={imgSrc}
              width={'100%'}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Camera;
