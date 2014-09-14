/**
 * DICOM file Decoder
 */

'use strict';

var util    = require('util'),
    utils   = require('./utils'),
    dcmdict = require('./dict');

/**
 * DCM Decoder object
 * holds the image buffer and byte offset counter
 */
var Decoder = function(buffer) {
  this.buffer = buffer; // the byte array buffer
  this.offset = 0;      // internal offset counter
};

/** DCM file object */
var DcmFile = function() {
  this.meta = {};
  this.data = {};
};

Decoder.prototype.decode = function() {

  var file = new DcmFile();

  // ignore the 128 byte preamble
  this.seek(128);

  // next 4 bytes MUST contain "DICM"
  var magicWord = this.read(4).toString();

  if (magicWord !== 'DICM')
    throw 'ERROR: Invalid DICOM file';

  // read the first header, this one usually contains
  // the byte size of the meta information header
  var row = this.readHeaderRow();
  console.log(util.inspect(row));

  // read some more rows
  // row = this.readHeaderRow();
  // console.log(util.inspect(row));

  // row = this.readHeaderRow();
  // console.log(util.inspect(row));

  // row = this.readHeaderRow();
  // console.log(util.inspect(row));

  // row = this.readHeaderRow();
  // console.log(util.inspect(row));

  // row = this.readHeaderRow();
  // console.log(util.inspect(row));

  return file;
};

// Pair of 16-bit unsigned integers
Decoder.prototype.readTag = function() {

  var group = this.buffer.readUInt16LE(this.offset);
  var eid   = this.buffer.readUInt16LE(this.offset + 2);

  this.offset += 4;

  return utils.createTagHex(group, eid);
};

// Two-byte character string
Decoder.prototype.readValueRepresentation = function() {
  return this.read(2).toString();
};

// a 16 or 32-bit unsigned integer
Decoder.prototype.readValueLength = function(vr) {

  var val;

  if (vr === 'UL') {
    val = this.buffer.readUInt16LE(this.offset);
    this.offset += 2;
  }
  else if (vr === 'OB') {
    val = this.buffer.readUInt8(this.offset + 2);
    this.offset += 6;
  }
  else if (vr === 'UI') {
    val = this.buffer.readUInt16LE(this.offset);
    this.offset += 2;
  }

  // if number of bytes is uneven, throw an error
  if (val % 2 !== 0)
    throw 'ERROR: uneven value byte length';

  return val;
};

// Look up in Data Dictionary
Decoder.prototype.readValueMultiplicity = function(tag) {
  return dcmdict.standardDictionary[tag][1];
};

Decoder.prototype.readKeyword = function(tag) {
  return dcmdict.standardDictionary[tag][4];
};

Decoder.prototype.readDescription = function(tag) {
  return dcmdict.standardDictionary[tag][2];
};

Decoder.prototype.readValueField = function(vr, length) {

  if (vr === 'UL')
    return this.readNumber(length);
  else if (vr === 'UI' || vr === 'OB')
    return this.read(length).toString();
  else
    return this.read(length).toString();

};

// Consists of Attribute Tag, Value Representation (optional),
// Value Length, Value Field
Decoder.prototype.readHeaderRow = function() {

  var tag = this.readTag();
  var vr  = this.readValueRepresentation();
  var vl  = this.readValueLength(vr);
  var vf  = this.readValueField(vr, vl);

  return {
    tag     : tag,
    vr      : vr,
    vf      : vf,
    length  : vl,
    vm      : this.readValueMultiplicity(tag),
    keyword : this.readKeyword(tag),
    // desc    : this.readDescription(tag),
  };

};

Decoder.prototype.meta = function() {

};

/* jump to a position in the byte array */
Decoder.prototype.seek = function(offset) {
  this.offset = offset;
};

/* read a chunk of data from the buffer */
Decoder.prototype.read = function(length) {
  var slice = this.buffer.slice(this.offset, this.offset + length);
  this.offset += length;
  return slice;
};

Decoder.prototype.readNumber = function(length) {

  var func;

  if (length === 4)
    func = 'readUInt32LE';
  else if (length === 2)
    func = 'readUInt16LE';
  else
    throw 'unknown number length';

  var val = this.buffer[func].apply(this.buffer, [this.offset]);
  this.offset += length;
  return val;
};

module.exports = Decoder;