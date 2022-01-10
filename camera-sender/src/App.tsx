import React from "react";
import ReactDOM from "react-dom";
import Webcam from "react-webcam";
import './App.css';
import { NstrumentaClient } from 'nstrumenta';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const App = () => {

  const [qty, setQty] = React.useState(null);
  const [number, setNumber] = React.useState(null);
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
      projectId: "",
      wsUrl,
    });

    nstClientRef.current.init()
  }, [])

  return (
    <><Stack spacing={2} direction='row'>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
      />

      {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
    </Stack>

    <Stack spacing={2}>
      <p></p>
    </Stack>

    <Stack spacing={2} direction='row'>

      <Button variant='contained' onClick={capture}>Capture photo</Button>
      <input placeholder="Time in Seconds" onBlur={(e) => { setQty(Number.parseFloat(e.target.value)) }} />

     </Stack>
  </>

  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
