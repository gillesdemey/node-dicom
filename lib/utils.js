'use strict';

/**
 * Converts the group id and element id into a hex string representation
 * for lookup in the data dictionary
 */
exports.createTagHex = function(group, eid) {
  return '0x' + ('000' + group).substr(-4) + ('000' + eid).substr(-4);
};