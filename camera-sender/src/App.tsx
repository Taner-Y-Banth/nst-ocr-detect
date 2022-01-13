import React from "react";
import ReactDOM from "react-dom";
import Webcam from "react-webcam";
import './App.css';
import { NstrumentaClient } from 'nstrumenta';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";

const App = () => {

  const [qty, setQty] = React.useState(null);
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const nstClientRef = React.useRef<NstrumentaClient>(null);

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

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Webcam
            width={'100%'}
            audio={false}
            ref={webcamRef}
            forceScreenshotSourceSize={true}
            screenshotFormat="image/png"
          />
        </Grid>
        <Grid item xs={12}  md={6}>
          {imgSrc && (
            <img
              src={imgSrc}
              width={'100%'}
            />
          )}
        </Grid>
        <Grid item>
        <Button variant='contained' onClick={capture}>Capture photo</Button>
        <input placeholder="Time in Seconds" onBlur={(e) => { setQty(Number.parseFloat(e.target.value)) }} />
        </Grid>
      </Grid>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
