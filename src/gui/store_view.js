
class StoreViewEntry {
  constructor(sub, rel, obj) {
    this.node = document.createElement('span');
    this.inputSub = document.createElement('input');
    this.inputRel = document.createElement('input');
    this.inputObj = document.createElement('input');

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
    this.actions = [];
  }

  setup(store) {
    this.divStoreView = document.createElement('div');
    this.form = document.createElement('form');
    this.fieldsetRelations = document.createElement('fieldset');
    this.fieldsetActions = document.createElement('fieldset');

    this.divStoreView.classList.add('store-view');

    let legendRelations = document.createElement('legend'),
        legendActions = document.createElement('legend');
    legendRelations.textContent = 'Relations';
    legendActions.textContent = 'Actions';
    this.fieldsetRelations.appendChild(legendRelations);
    this.fieldsetActions.appendChild(legendActions);

    store.relations.forEach(rel => {
      this.relations.push(new StoreViewEntry(rel[0], rel[1], rel[2]));
    });

    store.actions.forEach(act => {
      this.actions.push(new StoreViewEntry(act[0], act[1], act[2]));
    });

    this.relations.forEach(rel => {
      this.fieldsetRelations.appendChild(rel.getNode());
    });

    this.actions.forEach(act => {
      this.fieldsetActions.appendChild(act.getNode());
    });

    this.form.appendChild(this.fieldsetActions);
    this.form.appendChild(this.fieldsetRelations);
    this.divStoreView.appendChild(this.form);
    this.target.appendChild(this.divStoreView);
  }
}

export default StoreView;
