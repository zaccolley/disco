var weka = require('weka');
var data = __dirname + '/training.arff';

var options = {
  'classifier': 'weka.classifiers.functions.SMO',
  'params': ''
};

var testData = {
  outlook: 'overcast',
  temperature: 30,
  humidity: 2,
  windy: 'TRUE',
  play: 'no'
};

weka.classify(data, testData, options, function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log(result);
});
