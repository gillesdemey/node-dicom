var Parser = require('./lib/parser.js');

exports.parse = function(buffer) {

  // create parser object
  var parser = new Parser(buffer);

  // parse the file for info
  file = parser.parse();

  return file;
};
