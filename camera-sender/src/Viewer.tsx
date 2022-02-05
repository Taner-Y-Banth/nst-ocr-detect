import { NstrumentaClient } from 'nstrumenta';
import { useEffect, useState } from 'react';
import './App.css';

function Viewer() {
  const [imageSrc, setImageSrc] = useState<string>()
  const [processedImageSrc, setProcessedImageSrc] = useState<string>()
  const [visionText, setVisionText] = useState<string>()
  const [processedVisionText, setProcessedVisionText] = useState<string>()
  const [tesseractText, setTesseractText] = useState<string>()
  const [processedTesseractText, setProcessedTesseractText] = useState<string>()

  useEffect(() => {

    const wsUrlParam = new URLSearchParams(window.location.search).get("wsUrl");

    const wsUrl = wsUrlParam ? wsUrlParam : window.location.origin.replace('http', 'ws');

    const nstClient = new NstrumentaClient({
      apiKey: "",
      wsUrl,
    });

    nstClient.addListener("open", () => {
      console.log('nst client open')
      nstClient.subscribe('preprocessing', (message) => {
        setImageSrc('');
        setProcessedImageSrc('');
        const blob = new Blob([message], { type: 'image/png' });
        const src = URL.createObjectURL(blob);
        console.log(src);
        setImageSrc(src);
        setProcessedVisionText('');
        setVisionText('');
        setProcessedTesseractText('');
        setTesseractText('');
      })
      nstClient.subscribe('postprocessing', (grayscale) => {
        const blob = new Blob([grayscale], { type: 'image/png' });
        const src1 = URL.createObjectURL(blob);
        console.log(src1);
        setProcessedImageSrc(src1);
      })
      nstClient.subscribe('visionText', (message) => {
        console.log(message);
        setVisionText('Without autograyscale => ' + message);
      })
      nstClient.subscribe('processedVisionText', (message) => {
        console.log(message);
        setProcessedVisionText('With autograyscale => ' + message);
      })
      nstClient.subscribe('tesseractText', (message) => {
        console.log(message);
        setTesseractText('Without autograyscale => ' + message);
      })
      nstClient.subscribe('processedTesseractText', (message) => {
        console.log(message);
        setProcessedTesseractText('With autograyscale => ' + message);
      })
    })

    nstClient.init()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <table>
          <thead>
            <tr> <th colSpan={4} text-align='center'> Data Viewer </th> </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={2}> <img id="image" src={imageSrc ? imageSrc : 'https://nstrumenta.gallerycdn.vsassets.io/extensions/nstrumenta/nstrumenta-vscode/1.0.3/1633666110849/Microsoft.VisualStudio.Services.Icons.Default'} className="App-logo" alt="logo" /> </th>
              <th colSpan={2}> <img id="image" src={processedImageSrc ? processedImageSrc : 'https://nstrumenta.gallerycdn.vsassets.io/extensions/nstrumenta/nstrumenta-vscode/1.0.3/1633666110849/Microsoft.VisualStudio.Services.Icons.Default'} className="App-logo" alt="logo" /> </th>
            </tr>
            <tr>
              <th colSpan={2}>Unprocessed</th>
              <th colSpan={2}>Processed</th>
            </tr>
            <tr>
              <td>{tesseractText ? tesseractText : ''}</td>
              <td>{processedTesseractText ? processedTesseractText : ''}</td>
              <td>{visionText ? visionText : 'The json output of the image will apear here'}</td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default Viewer;