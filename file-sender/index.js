import fs from 'fs';
import { readFile } from 'fs/promises';
import minimist from 'minimist';
import { NstrumentaClient } from 'nstrumenta';
import ws from 'ws';

const argv = minimist(process.argv.slice(2));
const wsUrl = argv.wsUrl;

const nstClient = new NstrumentaClient();

fs.watch('home/mendel/images', async (eventType, filename) => {
  console.log(`event type is: ${eventType}`);
  if (eventType == 'change') {
    console.log(`filename provided: ${filename}`);
    const buff = await readFile(`home/mendel/images/${filename}`);

    nstClient.sendBuffer('processed', buff);

  } else {
    console.log('filename not provided');
  }
});

nstClient.addListener("open", () => {
  console.log("websocket opened successfully");
});

console.log("nstrumenta connect");

nstClient.connect({ wsUrl, nodeWebSocket: ws });