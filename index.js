import jimp from 'jimp';
import ws from 'ws';
import fs from 'fs';
import { createWorker } from 'tesseract.js';
import { NstrumentaClient } from 'nstrumenta'
import { readFile } from 'fs/promises';

const nstrumenta = new NstrumentaClient({ hostUrl: 'ws://localhost:8088' });
const completed = []

fs.watch('./images', async (eventType, filename) => {
  console.log(!completed.includes(filename) && `event type is: ${eventType}`);
  if (eventType == 'change') {
    completed.push(filename)
    console.log(`filename provided: ${filename}`);

   //TODO read file, get blob, send 
    nstrumenta.send('ocr', text);
    fs.rm('./eng.traineddata', () => { });
    fs.rm(`./images/${filename}`, () => { });
  } else {
    console.log('filename not provided');
  }
});

nstrumenta.addListener("open", () => {
  console.log("websocket successfully opened")
});

console.log("nstrumenta init")

nstrumenta.init(ws);