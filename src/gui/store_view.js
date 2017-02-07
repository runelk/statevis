const MicroEvent = require('microevent');

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
    this.target.innerHTML = '';
    this.divStoreView = document.createElement('div');
    this.form = document.createElement('form');
    this.fieldsetRelations = document.createElement('fieldset');

    this.divStoreView.classList.add('store-view');

    let inputLoad = document.createElement('input');
    inputLoad.id = 'input-load';
    inputLoad.setAttribute('type', 'file');
    inputLoad.addEventListener("change", this.onLoad.bind(this), false);
    this.form.appendChild(inputLoad);

    let legend = document.createElement('legend');
    legend.textContent = 'Relations';
    this.fieldsetRelations.appendChild(legend);

    store.relations.forEach(rel => {
      this.relations.push(new StoreViewEntry(rel[0], rel[1], rel[2]));
    });

    this.relations.forEach(rel => {
      this.fieldsetRelations.appendChild(rel.getNode());
    });

    this.form.appendChild(this.fieldsetRelations);
    this.divStoreView.appendChild(this.form);
    this.target.appendChild(this.divStoreView);
  }

  onLoad(evt) {
    this.trigger('load', evt.target.files);
  }

}

MicroEvent.mixin(StoreView);


export default StoreView;
