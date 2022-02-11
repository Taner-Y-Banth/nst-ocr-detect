# Nstrumenta Modules - OCR and Coral Detect
## **Description**
Real time service for two different Optical Character Recognition(OCR) libraries/APIs connected through nstrumenta, as well as looking at the post and preprocessed images of any system. There is also a module that contains a coral-tpu detection script which is utilized within the camera-sender react app.
## **Nstrumenta Module System**
These projects are all strung together through nstrumenta and can be utilized using nstrumenta modules. To use this system confirm you have completed the quickstart  guide, here:[https://github.com/nstrumenta/nstrumenta](https://github.com/nstrumenta/nstrumenta).
```shell
/nst-ocr-detect/$ nst module publish
```
The publish command will upload all modules declared in the config.json folder within the .nstrumenta folder and contain a module.json file within their respective folders.
```shell
/nst-ocr-detect/$ nst module run
```
The run command lists all published modules and their version, which is declared within the module.json folder. When trying to run a command it will use the start script with the package.json and run that using npm run start. You can also pass through varibles, such as:
```shell
/nst-ocr-detect/$ nst module run -- --wsUrl=<wss://hostname.vm.nstrumenta.com>
```
### **`Camera Sender`**
A react app that sends an image on the 'preprocessing' channel by using the webcam of a given device and taking a photo at an interval, defined by user input, or when a button is pressed. It also contains an app which displays both the unproccesed and processed images by subscribing to two channels, 'postprocessing' and 'preprocessing'. Along with displaying the images it displays the text output by subscribing to the 'processedVisionText' or 'processedTesseractText' channels and the 'visionText' or 'tesseractText' channels. For setup see [README.md](camera-sender/README.md).
### **`Coral Detect`**
A node app containing a python script as well as two models. The node app uses google zx to run the script with a given set of variables. It places it's output image into the images folder of the home directory of the coral dev board. You can easily change this value by changing the directory after the '-o <file/directory>'. You can run this file as a node app or as a module, although, I recomend running it as a module in congruence with file sender as it can then send the file that is detected to the camera-sender react app. To run a module make sure you have the latest version of nstrumenta installed and follow the steps in [https://github.com/nstrumenta/nstrumenta](https://github.com/nstrumenta/nstrumenta) to setup. If using without modules here is how to start the program:
```shell
/nst-ocr-detect/coral-detect$ node index --wsUrl=<wss://hostname.vm.nstrumenta.com/> --apiKey=<apiKey>
nstrumenta connect
client websocket opened <wss://hostname.vm.nstrumenta.com/>
```
### **`File Sender`**
A node app which watches a file, using fs.watch, that then sends an unprocessed image on the channel 'preprocessing'. 
```shell
/nst-ocr-detect/file-sender$ node index --wsUrl=<wss://hostname.vm.nstrumenta.com/> --apiKey=<apiKey>
nstClient connect
client websocket opened <wss://hostname.vm.nstrumenta.com/>
websocket successfully opened
```
### **`Image Manipulation`**
A node app that uses the javascript image manipulation program, or jimp, and subscribes to 'preprocessing' channel and sends a grayscale image on 'postprocessing'.
```shell
/nst-ocr-detect/image-manipulation/$ node index --wsUrl=<wss://hostname.vm.nstrumenta.com/> --apiKey=<apiKey>
nstrumenta connect
client websocket opened <wss://hostname.vm.nstrumenta.com/>
websocket opened successfully
Nstrumenta client subscribe <preprocessing>
```
### **`Tesseract OCR`**
A node app that uses [tesseract.js](https://github.com/naptha/tesseract.js) to recognize text from an image when an image is sent to either the 'preprocessing' or 'postprocessing' channels, it then sends the text to the 'processedTesseractText' channel and the 'tesseractText' channel, where it may then be used to display on the Image Sandbox app.
```shell
/nst-ocr-detect/tesseract-ocr$ node index --wsUrl=<wss://hostname.vm.nstrumenta.com/> --apiKey=<apiKey>
nstClient conncect
client websocket opened <wss://hostname.vm.nstrumenta.com/>
websocket successfully opened
Nstrumenta client subscribe <postprocessing>
Nstrumenta client subscribe <preprocessing>
```
### **`Vision OCR`**
A node app that uses the Google Vision api to recognize text from an image when an image is sent to either the 'preprocessing' or 'postprocessing' channels, it then sends the text to the 'processedVisionText' channel and the 'visionText' channel, where it may then be used to display on the Image Sandbox app. This uses the [Google Cloud Vision API](https://cloud.google.com/vision/docs/setup) which requires application credentionals. 
```shell
/nst-ocr-detect/vision-ocr/$ GOOGLE_APPLICATION_CREDENTIALS="path/to/credentials/" node index --wsUrl=<wss://hostname.vm.nstrumenta.com/> --apiKey=<apiKey>
nstClient connect
client websocket opened <wss://hostname.vm.nstrumenta.com/>
websocket successfully opened
Nstrumenta client subscribe <postprocessing>
Nstrumenta client subscribe <preprocessing>
```
