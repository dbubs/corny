'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.indexOf = indexOf;
exports.extend = extend;
exports.createFrame = createFrame;
exports.formatArray = formatArray;
exports.titleCase = titleCase;
exports.isNumeric = isNumeric;
// from https://github.com/wycats/handlebars.js/blob/e8ceafa6525a5d41a20aa74dfe24bf99d0bc2fcd/lib/handlebars/utils.js

// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function isFunction(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;
var isArray = exports.isArray = Array.isArray || function (value) {
  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? toString.call(value) === '[object Array]' : false;
};

// Older IE versions do not directly support indexOf so we must implement our own, sadly.
function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function formatArray(arr, lastSeparator) {
  lastSeparator = lastSeparator || 'and';
  var outStr = "";
  if (arr.length === 1) {
    outStr = arr[0];
  } else if (arr.length === 2) {
    //joins all with "and" but no commas
    //example: "bob and sam"
    outStr = arr.join(' ' + lastSeparator + ' ');
  } else if (arr.length > 2) {
    //joins all with commas, but last one gets ", and" (oxford comma!)
    //example: "bob, joe, and sam"
    outStr = arr.slice(0, -1).join(', ') + ', ' + lastSeparator + ' ' + arr.slice(-1);
  }
  return outStr;
}

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function isNumeric(arg) {
  return (typeof arg === 'number' || typeof arg === 'string') && !isNaN(arg - parseFloat(arg));
}