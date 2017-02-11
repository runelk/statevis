const MicroEvent = require('microevent');
const template = require('./store_view.mustache');

class StoreView {
  constructor(targetId) {
    this.target = document.querySelector(targetId);
  }

  onLoad(evt) {
    this.trigger('load', evt.target.files);
  }

  updateView(store) {
    console.log("NOWNOWNOW");
    console.log(store);
    this.target.innerHTML = template({
      relations: store.relations,
      entities: store.entities
    });
    document.querySelector("#input-load").addEventListener("change", this.onLoad.bind(this), false);
  }
}

MicroEvent.mixin(StoreView);

export default StoreView;
