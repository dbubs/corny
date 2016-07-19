'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _component = require('./component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Field = exports.Field = function () {
  function Field(name, val, fieldId, expanded) {
    _classCallCheck(this, Field);

    this.name = name;
    this.val = val.toUpperCase();
    this.fieldId = fieldId;
    this.expanded = expanded || [];
    this.components = this.getComponents();
    this.fieldType = this.getFieldType();
  }

  _createClass(Field, [{
    key: 'getFieldType',
    value: function getFieldType() {
      // return Array
      var self = this;
      var conf = new _config.Config(self.fieldId);
      // add phrases to the current field
      self.phrases = conf.phrases;
      var list = [];
      if (this.components.length > 1) {
        this.components.forEach(function (comp) {
          list.push(resolve(comp, false));
        });
        return list;
      } else {
        return [resolve(this.components[0], false)];
      }

      function resolve(comp, isList) {
        isList = isList ? true : false;
        var fieldType = void 0;
        // look through the fieldTypes and match the validation parameter
        for (var ft in conf.fieldTypes) {
          var ft_obj = conf.fieldTypes[ft];
          // set ft_isList to false if undefined
          var ft_isList = ft_obj.isList ? ft_obj.isList : false;
          if (ft_isList === isList) {
            var valid = true;
            // loop through components
            for (var c in comp) {
              if (comp[c] !== null) {
                var idx = ft_obj.notNull.indexOf(c);
                var found = idx > -1;
                if (!found) {
                  valid = false;
                }
              }
            }
            if (valid) {
              fieldType = ft;
              break;
            }
          }
        }
        return fieldType;
      }
    }
  }, {
    key: 'getComponents',
    value: function getComponents() {
      var self = this;
      var components = [];

      function parseValue(val) {
        // convert to uppercase
        val = val.toUpperCase();

        function handleResult(res) {
          // create string phrase
          return res;
        }

        return handleResult(getList(val));
      }

      function getList(val) {
        var list_parts = val.split(',');
        var list = [];
        if (list_parts.length > 1) {
          list_parts.forEach(function (part, i) {
            list.push(getStep(part));
          });
        } else {
          // single value
          list.push(getStep(val));
        }
        return list;
      }

      function getStep(val) {
        var step_parts = val.split('/');
        if (step_parts.length > 1) {
          return getRange(step_parts[0], step_parts[1]);
        } else {
          // not a step (ie */2)
          return getRange(val);
        }
      }

      function getRange(val, step_interval) {
        var component = new _component.Component();
        var range_parts = val.split('-');
        // logger("range_parts", range_parts);
        if (range_parts.length > 1) {
          component.range = { from: range_parts[0], to: range_parts[1] };
        } else {
          // not a range (ie * or 6)
          if (val === "*") {
            component.every = val;
          } else {
            component.scalar = val;
          }
        }
        component.step_interval = step_interval || null;
        return component;
      }

      return parseValue(this.val);
    }
  }]);

  return Field;
}();