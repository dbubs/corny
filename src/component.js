export class Component {
  constructor(props) {
    props = props || {};
    this.every = props.every || null;
    this.range = props.range || null;
    this.step_interval = props.step_interval || null;
    this.scalar = props.scalar || null;
  }
}
