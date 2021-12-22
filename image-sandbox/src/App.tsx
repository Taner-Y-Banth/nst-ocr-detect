import React, { useEffect, useState } from 'react';
import './App.css';
import { NstrumentaClient } from 'nstrumenta';

function App() {
  const [imageSrc, setImageSrc] = useState<string>()
  const [jimpSrc, setJimpSrc] = useState<string>()
  const [imageText, setImageText] = useState<string>()
  const [processedImageText, setProcessedImageText] = useState<string>()

  useEffect(() => {

    const wsUrlParam = new URLSearchParams(window.location.search).get("wsUrl");

    const wsUrl = wsUrlParam ? wsUrlParam : window.location.origin.replace('http', 'ws');

    const nstClient = new NstrumentaClient({
      apiKey: "",
      projectId: "",
      wsUrl,
    });

    nstClient.addListener("open", () => {
      console.log('nst client open')
      nstClient.subscribe('preprocessing', (message) => {
        setImageSrc('');
        setJimpSrc('');
        const blob = new Blob([message], { type: 'image/png' });
        const src = URL.createObjectURL(blob);
        console.log(src);
        setImageSrc(src);
        setProcessedImageText('');
        setImageText('');
      })
      nstClient.subscribe('postprocessing', (grayscale) => {
        const jimp = new Blob([grayscale], { type: 'image/png' });
        const src1 = URL.createObjectURL(jimp);
        console.log(src1);
        setJimpSrc(src1);
      })
      nstClient.subscribe('imageText', (message) => {
        console.log(message);
        setImageText('Without Processing => ' + message);
      })
      nstClient.subscribe('processedImageText', (message) => {
        console.log(message);
        setProcessedImageText('With Processing => ' + message);
      })
    })
    nstClient.init()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img id="image" src={imageSrc ? imageSrc : 'https://nstrumenta.gallerycdn.vsassets.io/extensions/nstrumenta/nstrumenta-vscode/1.0.3/1633666110849/Microsoft.VisualStudio.Services.Icons.Default'} className="App-logo" alt="logo" />
        <img id="image" src={jimpSrc ? jimpSrc : 'https://nstrumenta.gallerycdn.vsassets.io/extensions/nstrumenta/nstrumenta-vscode/1.0.3/1633666110849/Microsoft.VisualStudio.Services.Icons.Default'} className="App-logo" alt="logo" />
        <p>
          {imageText}
        </p>
        <p>
          {processedImageText}
        </p>
      </header>
    </div>
  );
}

export default App;
