"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = exports.Component = function Component(props) {
  _classCallCheck(this, Component);

  props = props || {};
  this.every = props.every || null;
  this.range = props.range || null;
  this.step_interval = props.step_interval || null;
  this.scalar = props.scalar || null;
};