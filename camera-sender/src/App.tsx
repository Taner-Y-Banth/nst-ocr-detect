import React from "react";
import ReactDOM from "react-dom";
import Webcam from "react-webcam";
import './App.css';
import { NstrumentaClient } from 'nstrumenta';

const App = () => {

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const nstClientRef = React.useRef<NstrumentaClient>(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc);
    nstClientRef.current?.send('preprocessing', imageSrc)
  }, [webcamRef, setImgSrc]);

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
