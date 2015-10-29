var cv = require('opencv');

var inputPath = './resources/',
    outputPath = './converted_resources/';

var thresholds = {
  edges: {
    low: 10,
    high: 100
  }
}

var fileNames = [
  '001.jpg', '002.jpg', '003.jpg', '004.jpg', '005.jpg', '006.jpg', '007.jpg',
  '008.jpg', '009.jpg', '010.jpg', '011.jpg'
];

for(var f = 0; f < fileNames.length; f++){
  var fileName = fileNames[f];

  processImage(fileName);
}

function processImage(filename){

  cv.readImage(inputPath + fileName, function(err, image){
    if (err){
      throw err;
    }
    if (image.width() < 1 || image.height() < 1){
      throw new Error('Image has no size');
    }

    image.save(outputPath + fileName);

    // convert image to grayscale
    image.convertGrayscale();
    image.save(outputPath + 'gray_' + fileName);

    // blur it
    for(var i = 0; i < 3; i++){
      image.gaussianBlur([5, 5]);
    }
    image.save(outputPath + 'blurred_' + fileName);

    // edge detection using the canny algorithm
    image.canny(thresholds.edges.low, thresholds.edges.high);
    image.save(outputPath + 'edges_' + fileName);

    // erode lines
    image.erode(.8);
    image.save(outputPath + 'eroded_' + fileName);

    // dilate lines
    image.dilate(.8);
    image.save(outputPath + 'dilated_' + fileName);

    // fix the lines using hough
    // -- (gray, lines, rho, theta, threshold, minLineLength, maxLineGap)
    image.houghLinesP()
    image.save(outputPath + 'lines_' + fileName);

    console.log('Images saved to: ' + outputPath);

  });

}
