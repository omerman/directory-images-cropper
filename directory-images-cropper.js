const imagemagick = require('gm');
const fs = require('fs');
const resizeGif = require('./gif/resize');
const cropGif = require('./gif/crop');

const directoryImagesCrop = ({ inputDir, outputDir, cropSize, extensions }) => {
  fs.readdir(inputDir, (readError, files) => {
    if (readError) {
      throw new Error(`couldnt read ${inputDir}`, readError);
    }
    files.forEach((file) => {
      const ext = file.substr(file.lastIndexOf('.')).substr(1);
      const skipExension = extensions.indexOf(ext) === -1;
      if (skipExension) {
        return;
      }

      imagemagick(`${inputDir}/${file}`)
        .size((sizeErr, size) => {
          if (sizeErr) {
            throw new Error(`couldnt get size of ${inputDir}/${file}`, sizeErr);
          }
          let widthResize;
          let heightResize;
          let xCrop;
          let yCrop;
          if (size.width < size.height) {
            widthResize = cropSize;
            heightResize = size.height / (size.width / cropSize);
            xCrop = 0;
            yCrop = (heightResize - cropSize) / 2;
          } else {
            heightResize = cropSize;
            widthResize = size.width / (size.height / cropSize);
            yCrop = 0;
            xCrop = (widthResize - cropSize) / 2;
          }

          if (ext === 'gif') {
            resizeGif(`${inputDir}/${file}`, `${outputDir}/${file}`, widthResize, heightResize);
            cropGif(`${outputDir}/${file}`, `${outputDir}/${file}`, {
              x: xCrop,
              y: yCrop,
              cropSize
            });
            console.log(`cropping successfull: ${outputDir}/${file}`);
          } else {
            imagemagick(`${inputDir}/${file}`)
            .resize(widthResize, heightResize)
            .crop(cropSize, cropSize, xCrop, yCrop)
            .write(`${outputDir}/${file}`, (cropErr) => {
              if (cropErr) {
                throw new Error(cropErr);
              }
              console.log(`cropping successfull: ${outputDir}/${file}`);
            });
          }
        });
    });
  });
};

module.exports = directoryImagesCrop;
