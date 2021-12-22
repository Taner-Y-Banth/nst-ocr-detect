# Nstrumenta OCR Application
## **Description**
Multiple node apps, as well as a react app, which can be displayed within the sandbox functionality, connected through the nst send and subscribe features.
### **File Sender**
A node app which watches a file,using fs.watch on a specific, that then sends a processed image using jimp, a javascript image manipulation program, and the unproccessed images on two channels, 'postprocessing' and 'preprocessing'.
### **Image Sandbox**
A react app which displays both the unproccesed and processed images by subscribing to two channels, 'postprocessing' and 'preprocessing'. Along with displaying the images it displays the text output by subscribing to the 'processedImageText' channel and the 'imageText' channel.
### **Vision OCR and Tesseract OCR**
Two node apps that use either tesseract.js or the Google Vision api to recognize text from an image when an image is sent to either the 'preprocessing' or 'postprocessing' channels, it then sends the text to the 'processedImageText' channel and the 'imageText' channel, where it may then be used to display on the Image Sandbox app.