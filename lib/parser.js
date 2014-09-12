/**
 * DICOM file parser
 */

var util = require('util');

var Parser = function(buffer) {
  this.buffer = buffer; // the byte array buffer
  this.offset = 0;      // internal offset counter
}

Parser.prototype.parse = function() {

  var file = new DcmFile();

  // ignore the 128 byte preamble
  this.seek(128);

  // next 4 bytes MUST contain "DICM"
  var magicWord = this.read(4).toString();

  if (magicWord !== 'DICM')
    throw 'ERROR: Invalid DICOM file';

  // read the next tag
  var tag = this.readTag().toString(16); // (?)
  var vr = this.read(2).toString();
  var vl = this.readNumber();

  console.log(util.inspect(tag));
  console.log(util.inspect(vr));
  console.log(util.inspect(vl));

  file.meta = this.meta();

  return file;
};

Parser.prototype.meta = function() {
  return {};
};

/* jump to a position in the byte array */
Parser.prototype.seek = function(offset) {
  this.offset = offset;
};

/* read a chunk of data from the buffer */
Parser.prototype.read = function(length) {
  var slice = this.buffer.slice(this.offset, this.offset + length);
  this.offset += length;
  return slice;
};

Parser.prototype.readNumber = function(length) {
  var n = this.buffer.readUInt8(this.offset);
  this.offset += 2;
  return n;
};

Parser.prototype.readTag = function () {
  var vl =  this.buffer[this.offset + 1] * 256 * 256 * 256
          + this.buffer[this.offset] * 256 * 256
          + this.buffer[this.offset + 3] * 256
          + this.buffer[this.offset + 2];
  this.offset += 4;
  return vl;
};

var DcmFile = function() {
  return {
    meta: {},
    data: {}
  };
}

module.exports = Parser;