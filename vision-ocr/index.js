import ws from 'ws';
import fs from 'fs';
import minimist from 'minimist';
import { NstrumentaClient } from 'nstrumenta'
import vision from '@google-cloud/vision';

const argv = minimist(process.argv.slice(2));
const wsUrl = 'wss://' + argv.wsUrl + '.vm.nstrumenta.com';

const nstClient = new NstrumentaClient({
  apiKey: "",
  projectId: "",
  wsUrl,
});

const client = new vision.ImageAnnotatorClient();

nstClient.addListener("open", () => {
  console.log("websocket successfully opened")

  nstClient.subscribe('postprocessing', async (message) => {

    const [result] = await client.textDetection(message);
    const detections = result.textAnnotations;
    detections.forEach(text => console.log(text.description));
    nstClient.send('imageText', text.description)

  }),

    nstClient.subscribe('preprocessing', async (message) => {

      const [result] = await client.textDetection(message);
      const detections = result.textAnnotations;
      detections.forEach(text => nstClient.send('processedImageText', text));

    });

  nstClient.addListener("open", () => {
    console.log("websocket successfully opened")
  });
})

console.log("nstClient init")

nstClient.init(ws);