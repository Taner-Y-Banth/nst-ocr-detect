import { $ } from 'zx'

void async function() {
    await $ `python3 detect_image.py -m /test_data/ssd_mobilenet_v2_coco_quant_postprocess_edgetpu.tflite -l /test_data/coco_labels.txt -i /test_data/grace_hopper.bmp -o ../file-sender/images/grace_hopper_processed.png`
}()