import { $ } from 'zx'
import minimist from 'minimist';
import fsPromises from 'fs/promises';
import ws from 'ws';

const argv = minimist(process.argv.slice(2));
const wsUrl = argv.wsUrl;

const nstClient = new NstrumentaClient({
    apiKey: "",
    projectId: "",
    wsUrl,
});

nstClient.addListener("open", () => {
    nstClient.subscribe('preprocessing', async(buff) => {

        await fsPromises.writeFile('infile.png', buff);
        await $(`python3 detect_image.py -m /test_data/ssd_mobilenet_v2_coco_quant_postprocess_edgetpu.tflite -l /test_data/coco_labels.txt -i infile.png -o ../file-sender/images/processed.png`)

    });
});

nstClient.addListener("open", () => {
    console.log("websocket opened successfully");
});

console.log("nstrumenta init");

nstClient.init(ws);