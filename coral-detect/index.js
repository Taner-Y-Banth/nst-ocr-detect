import fsPromises from 'fs/promises';
import Jimp from 'jimp';
import minimist from 'minimist';
import { NstrumentaClient } from 'nstrumenta';
import ws from 'ws';
import { $ } from 'zx';

const argv = minimist(process.argv.slice(2));
const wsUrl = argv.wsUrl;
const apiKey = argv.apiKey;

const nstClient = new NstrumentaClient(apiKey);

nstClient.addListener("open", () => {
    nstClient.addSubscription('preprocessing', async (buff) => {

        await fsPromises.writeFile('infileone.png', buff);

        Jimp.read("infileone.png", async (err, image) => {

            if (err) {
                throw new Error(err);
            }

            image.write("infile.png");
            await $`python3 detect_image.py -m ./test_data/ssd_mobilenet_v2_coco_quant_postprocess_edgetpu.tflite -l ./test_data/coco_labels.txt -i infile.png -o /home/mendel/images/processed.png`

        });
    });
});

nstClient.addListener("open", () => {
    console.log("websocket opened successfully");
});

console.log("nstrumenta connect");

nstClient.connect({ wsUrl, nodeWebSocket: ws });