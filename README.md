# Nstrumenta OCR Application
## **Description**
Real time service for two different Optical Character Recognition(OCR) libraries/APIs connected through nstrumenta. 
### **`File Sender`**
A node app which watches a file,using fs.watch, that then sends a processed image using jimp, a javascript image manipulation program, and the unproccessed images on two channels, 'postprocessing' and 'preprocessing'. 
```shell
file-watch-nstsend/file-sender$ node index --wsUrl=wss://hostname.vm.nstrumenta.com
nstClient init
client websocket opened <wss://hostname.vm.nstrumenta.com/>
websocket successfully opened
```
### **`Tesseract OCR`**
A node app that uses [tesseract.js](https://github.com/naptha/tesseract.js) to recognize text from an image when an image is sent to either the 'preprocessing' or 'postprocessing' channels, it then sends the text to the 'processedTesseractText' channel and the 'tesseractText' channel, where it may then be used to display on the Image Sandbox app.
```shell
/file-watch-nstsend/tesseract-ocr$ node index --wsUrl=wss://hostname.vm.nstrumenta.com
nstClient init
client websocket opened <wss://hostname.vm.nstrumenta.com/>
websocket successfully opened
Nstrumenta client subscribe <postprocessing>
Nstrumenta client subscribe <preprocessing>
```
### **`Vision OCR`**
A node app that uses the Google Vision api to recognize text from an image when an image is sent to either the 'preprocessing' or 'postprocessing' channels, it then sends the text to the 'processedVisionText' channel and the 'visionText' channel, where it may then be used to display on the Image Sandbox app. This uses the [Google Cloud Vision API](https://cloud.google.com/vision/docs/setup) which requires application credentionals. 
```shell
/file-watch-nstsend/vision-ocr/$ GOOGLE_APPLICATION_CREDENTIALS="path/to/credentials/" node index --wsUrl=wss://hostname.vm.nstrumenta.com
nstClient init
client websocket opened <wss://hostname.vm.nstrumenta.com/>
websocket successfully opened
Nstrumenta client subscribe <postprocessing>
Nstrumenta client subscribe <preprocessing>
```
### **`Image Sandbox`**
A react app which displays both the unproccesed and processed images by subscribing to two channels, 'postprocessing' and 'preprocessing'. Along with displaying the images it displays the text output by subscribing to the 'processedVisionText' or 'processedTesseractText' channels and the 'visionText' or 'tesseractText' channels. See [README.md](image-sandbox/README.md).