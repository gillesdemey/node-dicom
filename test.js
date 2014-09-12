var dicom = require('./index.js');
var fs    = require('fs');

// TODO: don't use synchronous methods
var buffer = fs.readFileSync('test/IM-0001-0001.dcm');
var file = dicom.parse(buffer);

console.log(file);
