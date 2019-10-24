class OptionModel {
  constructor({id, name}) {
    this.value = id;
    this.title = name;
  }
}

export default class SelectModel {
  constructor(value = '', list = []) {
    this.value = value;
    this.options = list.map(option => new OptionModel(option));
  }
}
