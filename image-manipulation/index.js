import jimp from 'jimp';
import minimist from 'minimist';
import { NstrumentaClient } from 'nstrumenta';
import ws from 'ws';

const argv = minimist(process.argv.slice(2));
const wsUrl = argv.wsUrl;

const nstClient = new NstrumentaClient();

nstClient.addListener("open", () => {
    console.log("websocket opened successfully")
    nstClient.addSubscription('preprocessing', async (buff) => {
        const image = await jimp.read(buff);
        const outImage = await image.invert().getBufferAsync(jimp.MIME_PNG);
        nstClient.sendBuffer('postprocessing', outImage);
    });
});

console.log("nstrumenta connect");

nstClient.connect({ wsUrl, nodeWebSocket: ws });