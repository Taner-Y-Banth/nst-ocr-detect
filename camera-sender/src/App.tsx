import React from "react";
import ReactDOM from "react-dom";
import Webcam from "react-webcam";
import './App.css';
import { NstrumentaClient } from 'nstrumenta';

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
      projectId: "",
      wsUrl,
    });

    nstClientRef.current.init()
  }, [])


  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
      />

      <div>
        <legend>Add Interval</legend>
        <input placeholder="Time in Seconds" onBlur={(e) => { setQty(Number.parseFloat(e.target.value)) }} />
      </div>

      <button onClick={capture}>Capture photo</button>
      {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
