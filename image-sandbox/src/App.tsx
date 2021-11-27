import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { NstrumentaClient } from 'nstrumenta';

function App() {
  const [image, setImage] = useState<string>()

  useEffect(() => {
    console.log('app')
    const nstClient = new NstrumentaClient({ apiKey: '', projectId: '', wsUrl: 'ws://localhost:8088' });
    nstClient.addListener("open", () => {
      console.log('nst client open')
      nstClient.subscribe('ocr', (message) => {
        setImage('`message ${Date.now()}`')
      })
    })
    nstClient.init()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {image}
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
