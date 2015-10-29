var cv = require('opencv');

var inputPath = './resources/',
    outputPath = './resources_converted/';

var thresholds = {
  edges: {
    low: 50,
    high: 200
  }
};

var debug = true;

var nIters = 2;
var maxArea = 2500;

var GREEN = [0, 255, 0]; // B, G, R
var WHITE = [255, 255, 255]; // B, G, R
var RED   = [0, 0, 255]; // B, G, R

var fileNames = [
  '001.jpg', '002.jpg', '003.jpg', '004.jpg', '005.jpg', '006.jpg', '007.jpg',
  '008.jpg', '009.jpg', '010.jpg', '011.jpg'
];

for(var f = 0; f < 1; f++){
  var fileName = fileNames[f];

  processImage(fileName);
}

function processImage(filename){

  cv.readImage(inputPath + fileName, function(err, image){
    if (err){
      throw err;
    }

    var width = image.width();
    var height = image.height();
    if (width < 1 || height < 1){
      throw new Error('Image has no size');
    }

    var big = new cv.Matrix(height, width);
    var all = new cv.Matrix(height, width);

    var originalImage = image.copy();

    // convert image to grayscale
    image.convertGrayscale();
    image.brightness(100);
    debug && image.save(outputPath + 'gray_' + fileName);

    // blur it
    image.medianBlur(5);
    image.gaussianBlur([5, 5]);
    debug && image.save(outputPath + 'blurred_' + fileName);

    // edge detection using the canny algorithm
    image.canny(thresholds.edges.low, thresholds.edges.high);
    debug && image.save(outputPath + 'edges_' + fileName);

    // remove noise lines
    image.dilate(1, 2);
    image.erode(1, 2);
    image.dilate(1, 1);
    image.erode(1, 1);
    debug && image.save(outputPath + 'denoised_' + fileName);

    // fix the lines using hough
    // -- (gray, lines, rho, theta, threshold, minLineLength, maxLineGap)
    var houghLines = image.houghLinesP()

    for(var h = 0; h < houghLines.length; h++){
      var houghLine = houghLines[h];

      var x1 = houghLine[0];
      var y1 = houghLine[1];
      var x2 = houghLine[2];
      var y2 = houghLine[3];

      originalImage.line([x1,y1], [x2, y2]);

    }

    originalImage.save(outputPath + 'lines_' + fileName);

    console.log('Images saved to: ' + outputPath);

  });

}
