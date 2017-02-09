const MicroEvent = require('microevent');
const template = require('../../templates/test.mustache');

class StoreViewEntry {
  constructor(sub, rel, obj) {
    this.node = document.createElement('span');
    this.inputSub = document.createElement('input');
    this.inputRel = document.createElement('input');
    this.inputObj = document.createElement('input');

    this.node.classList.add('triple');
    this.inputSub.value = sub;
    this.inputRel.value = rel;
    this.inputObj.value = obj;

    this.node.appendChild(this.inputSub);
    this.node.appendChild(this.inputRel);
    this.node.appendChild(this.inputObj);
  }

  getNode() {
    return this.node;
  }
}


class StoreView {
  constructor(targetId) {
    this.target = document.querySelector(targetId);
    this.relations = [];
  }

  setup(store) {
    this.setData(store);
  }

  onLoad(evt) {
    this.trigger('load', evt.target.files);
  }

  setData(store) {
    this.relations = store.relations;
    this.updateView();
  }

  updateView() {
    this.target.innerHTML = template({ relations: this.relations });
    document.querySelector("#input-load").addEventListener("change", this.onLoad.bind(this), false);
  }
}

MicroEvent.mixin(StoreView);


export default StoreView;
