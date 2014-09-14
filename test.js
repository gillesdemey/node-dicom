var dicom = require('./index.js');
var fs    = require('fs');

// TODO: don't use synchronous methods

var file = typeof process.argv[2] === 'undefined'
  ? 'test/IM-0001-0001.dcm'
  : process.argv[2];

var buffer = fs.readFileSync(file);
var file = dicom.decode(buffer);

console.log(file);
