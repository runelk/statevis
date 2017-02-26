import MicroEvent from 'microevent';
const template = require('./EntityList.mustache');

class EntityList {

  constructor(targetId) {
    this.target = document.querySelector(targetId);
  }

  render(data) {
    this.target.innerHTML = template(data);
  }
}

export default EntityList;
