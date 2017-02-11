const MicroEvent = require('microevent');
const template = require('./store_view.mustache');

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
