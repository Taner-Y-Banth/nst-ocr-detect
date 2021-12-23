import ws from 'ws';
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
    const text = result.textAnnotations[0].description;
    nstClient.send('processedVisionText', text);

  }),

    nstClient.subscribe('preprocessing', async (message) => {

      const [result] = await client.textDetection(message);
      const text = result.textAnnotations[0].description;
      nstClient.send('visionText', text);

    });

  nstClient.addListener("open", () => {
    console.log("websocket successfully opened")
  });
})

console.log("nstClient init")

nstClient.init(ws);