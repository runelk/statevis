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
    this.setData(store);
  }

  onLoad(evt) {
    this.trigger('load', evt.target.files);
  }

  setData(store) {
    this.relations = [];
    store.relations.forEach(rel => {
      this.relations.push(new StoreViewEntry(rel[0], rel[1], rel[2]));
    });
    this.updateView();
  }

  updateView() {
    this.target.innerHTML = '';
    let divStoreView = document.createElement('div'),
        form = document.createElement('form'),
        fieldsetRelations = document.createElement('fieldset'),
        inputLoad = document.createElement('input'),
        legend = document.createElement('legend');

    divStoreView.classList.add('store-view');

    inputLoad.id = 'input-load';
    inputLoad.setAttribute('type', 'file');
    inputLoad.addEventListener("change", this.onLoad.bind(this), false);

    legend.textContent = 'Relations';

    this.relations.forEach(rel => {
      fieldsetRelations.appendChild(rel.getNode());
    });

    fieldsetRelations.appendChild(legend);
    form.appendChild(inputLoad);
    form.appendChild(fieldsetRelations);
    divStoreView.appendChild(form);
    this.target.appendChild(divStoreView);
  }

}

MicroEvent.mixin(StoreView);


export default StoreView;
