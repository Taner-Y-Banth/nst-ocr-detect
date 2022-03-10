import fs from 'fs';
import { readFile } from 'fs/promises';
import minimist from 'minimist';
import { NstrumentaClient } from 'nstrumenta';
import ws from 'ws';

const argv = minimist(process.argv.slice(2));
const wsUrl = argv.wsUrl;

const nstClient = new NstrumentaClient();

const completed = [];

function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}

let timeoutID = undefined

fs.watch('/home/mendel/images', (eventType, filename) => {
  console.log(`event type is: ${eventType}`, filename, completed);
  if (eventType == 'change' && !completed.includes(filename)) {

    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout( async () => {
      completed.push(filename);
      console.log(`filename provided: ${filename}`);
      const buff = await readFile(`/home/mendel/images/${filename}`);
      nstClient.sendBuffer('postprocessing', buff);
      console.log('nstClient Sent Buffer')
      fs.rmSync(`/home/mendel/images/${filename}`)
    }, 400)
  }
}),

  nstClient.addListener("open", () => {
    console.log("websocket opened successfully");
  });

console.log("nstrumenta connect");

nstClient.connect({ wsUrl, nodeWebSocket: ws });