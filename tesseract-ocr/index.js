import fs from 'fs';
import minimist from 'minimist';
import { NstrumentaClient } from 'nstrumenta';
import { createWorker } from 'tesseract.js';
import ws from 'ws';

const argv = minimist(process.argv.slice(2));
const wsUrl = argv.wsUrl;

const nstClient = new NstrumentaClient({
  apiKey: "",
  projectId: "",
  wsUrl,
});

nstClient.addListener("open", () => {
  console.log("websocket successfully opened")

  nstClient.subscribe('postprocessing', async (message) => {

    const worker = createWorker({
      logger: m => console.log(m)
    });
    const languageFile = 'eng'
    await worker.load();
    await worker.loadLanguage(languageFile);
    await worker.initialize(languageFile);
    const { data: { text } } = await worker.recognize(message);
    await worker.terminate();
    console.log(text);
    nstClient.send('processedTesseractText', text);
    fs.rm('./eng.traineddata', () => { });
  }),

    nstClient.subscribe('preprocessing', async (message) => {

      const worker = createWorker({
        logger: m => console.log(m)
      });
      const languageFile = 'eng'
      await worker.load();
      await worker.loadLanguage(languageFile);
      await worker.initialize(languageFile);
      const { data: { text } } = await worker.recognize(message);
      await worker.terminate();
      console.log(text);
      nstClient.send('tesseractText', text);
      fs.rm('./eng.traineddata', () => { });
    });

  nstClient.addListener("open", () => {
    console.log("websocket successfully opened")
    nstClient.subscribe('ocr', () => {
    })
  });
})

console.log("nstClient init")

nstClient.init(ws);