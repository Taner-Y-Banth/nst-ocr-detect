import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { NstrumentaClient } from 'nstrumenta';
import { createImportSpecifier } from 'typescript';

function App() {
  const [imageSrc, setImageSrc] = useState<string>()
  const [text, setText] = useState<string>()

  useEffect(() => {
    console.log('app')
    const nstClient = new NstrumentaClient({ apiKey: '', projectId: '', wsUrl: 'ws://localhost:8088' });
    nstClient.addListener("open", () => {
      console.log('nst client open')
      nstClient.subscribe('ocr', (message) => {
        const blob = new Blob([message], { type: 'image/png' });
        const src = URL.createObjectURL(blob)
        console.log(src);
        setImageSrc(src);
      })
      nstClient.subscribe('images', (message) => {
        console.log(message);
        setText(message);
      })
    })
    nstClient.init()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img id="image" src={imageSrc ? imageSrc : logo} className="App-logo" alt="logo" />
        <p>
          {text}
        </p>
      </header>
    </div>
  );
}

export default App;
