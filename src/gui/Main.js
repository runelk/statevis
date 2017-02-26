import MicroEvent from 'microevent';
import GraphView from './GraphView';
import StoreView from './StoreView';
const template = require('./Main.mustache');

class Main {
  constructor(targetId) {
    this.target = document.querySelector(targetId);
    this.target.innerHTML = template();
    this.graphView = new GraphView('#graph-view');
    this.storeView = new StoreView('#store-view');
  }

  updateView(store) {
    this.graphView.updateView(store);
    this.storeView.updateView(store);
  }
}

MicroEvent.mixin(Main);

export default Main;
