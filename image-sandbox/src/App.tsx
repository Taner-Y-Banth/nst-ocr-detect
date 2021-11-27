import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { NstrumentaClient } from 'nstrumenta';

function App() {
  const [imageSrc, setImageSrc] = useState<string>()

  useEffect(() => {
    console.log('app')
    const nstClient = new NstrumentaClient({ apiKey: '', projectId: '', wsUrl: 'ws://localhost:8088' });
    nstClient.addListener("open", () => {
      console.log('nst client open')
      nstClient.subscribe('ocr', (message) => {
        // const blob = new Blob(message.data, { type: 'image/jpeg' });
        const b64encoded = btoa(String.fromCharCode.apply(null, message.data));
        const src = 'data:image/jpeg;base64,' + b64encoded;
        setImageSrc(src);
      })
    })
    nstClient.init()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img id="image" src={imageSrc ? imageSrc : logo} className="App-logo" alt="logo" />
        <p>
          grapefruit?
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
