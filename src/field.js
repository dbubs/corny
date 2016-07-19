import {Config} from './config';
import {Component} from './component';

export class Field {
  constructor(name, val, fieldId, expanded) {
    this.name = name;
    this.val = val.toUpperCase();
    this.fieldId = fieldId;
    this.expanded = expanded || [];
    this.components = this.getComponents();
    this.fieldType = this.getFieldType();
  }

  getFieldType() {
    // return Array
    const self = this;
    const conf = new Config(self.fieldId);
    // add phrases to the current field
    self.phrases = conf.phrases;
    let list = [];
    if (this.components.length > 1) {
      this.components.forEach(function(comp) {
        list.push(resolve(comp, false));
      });
      return list;
    } else {
      return [resolve(this.components[0], false)];
    }

    function resolve(comp, isList) {
      isList = (isList) ? true : false;
      let fieldType;
      // look through the fieldTypes and match the validation parameter
      for (let ft in conf.fieldTypes) {
        let ft_obj = conf.fieldTypes[ft];
        // set ft_isList to false if undefined
        const ft_isList = (ft_obj.isList) ? ft_obj.isList : false;
        if (ft_isList === isList) {
          let valid = true;
          // loop through components
          for (let c in comp) {
            if (comp[c] !== null) {
              let idx = ft_obj.notNull.indexOf(c);
              let found = (idx > -1);
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

  getComponents() {
    const self = this;
    let components = [];

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
      const list_parts = val.split(',');
      let list = [];
      if (list_parts.length > 1) {
        list_parts.forEach(function(part, i) {
          list.push(getStep(part));
        });
      } else {
        // single value
        list.push(getStep(val));
      }
      return list;
    }

    function getStep(val) {
      const step_parts = val.split('/');
      if (step_parts.length > 1) {
        return getRange(step_parts[0], step_parts[1]);
      } else {
        // not a step (ie */2)
        return getRange(val);
      }

    }

    function getRange(val, step_interval) {
      let component = new Component();
      const range_parts = val.split('-');
      // logger("range_parts", range_parts);
      if (range_parts.length > 1) {
        component.range = {from: range_parts[0], to: range_parts[1]};
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
}