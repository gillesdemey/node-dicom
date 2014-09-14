'use strict';

var Decoder = require('./lib/decoder.js');

exports.decode = function(buffer) {

  // create parser object
  var decoder = new Decoder(buffer);

  // parse the file for info
  var file = decoder.decode();
  return file;
};