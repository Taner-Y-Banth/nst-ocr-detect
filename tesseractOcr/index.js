import ws from 'ws';
import fs from 'fs';
import minimist from 'minimist';
import { createWorker } from 'tesseract.js';
import { NstrumentaClient } from 'nstrumenta'

const argv = minimist(process.argv.slice(2));
const wsUrl = 'wss://' + argv.wsUrl;

const nstClient = new NstrumentaClient({
  apiKey: "",
  projectId: "",
  wsUrl,
});

nstClient.addListener("open", () => {
  console.log("websocket successfully opened")

  nstClient.subscribe('jimp', async (message) => {

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
    nstClient.send('jimpText', text);
    fs.rm('./eng.traineddata', () => { });
  }),

    nstClient.subscribe('ocr', async (message) => {

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
      nstClient.send('text', text);
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