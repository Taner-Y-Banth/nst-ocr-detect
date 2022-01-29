import { $ } from 'zx'
import minimist from 'minimist';
import fsPromises from 'fs/promises';
import ws from 'ws';
import { NstrumentaClient } from 'nstrumenta';
import Jimp from 'jimp';

const argv = minimist(process.argv.slice(2));
const wsUrl = argv.wsUrl;
const apiKey = argv.apiKey;

const nstClient = new NstrumentaClient({
    apiKey,
    wsUrl,
});

nstClient.addListener("open", () => {
    nstClient.subscribe('preprocessing', async(buff) => {

        await fsPromises.writeFile('infileone.png', buff);

        Jimp.read("infileone.png", async(err, image) => {

            if (err) {
                throw new Error(err);
            }

            image.write("infile.jpg");
            await $ `python3 detect_image.py -m ./test_data/ssd_mobilenet_v2_coco_quant_postprocess_edgetpu.tflite -l ./test_data/coco_labels.txt -i infile.png -o ../file-sender/images/processed.png`

        });
    });
});

nstClient.addListener("open", () => {
    console.log("websocket opened successfully");
});

console.log("nstrumenta init");

nstClient.init(ws);