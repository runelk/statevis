const MicroEvent = require('microevent');
const template = require('./store_view.mustache');
import { ActionTypes } from '../constants';
import TripleView from './TripleView.js';

// TODO use holmes for filtering (https://haroen.me/holmes/)

class StoreView {
  constructor(targetId) {
    this.target = document.querySelector(targetId);
  }

  onLoad(evt) {
    this.trigger(ActionTypes.STORE_VIEW_LOAD, evt.target.files);
  }

  updateView(store) {
    this.target.innerHTML = template({
      // relations: store.relations,
      entities: store.entities
    });
    document.querySelector("#input-load").addEventListener("change", this.onLoad.bind(this), false);
    store.relations.forEach(rel => {

    });
    this.addEventListeners();
  }

  addEventListeners() {
    this.target.querySelectorAll('input.atom').forEach(atom => {
      atom.addEventListener('input', e => {
        this.trigger(ActionTypes.ATOM_INPUT, e.target);
      });
      atom.addEventListener('change', e => {
        this.trigger(ActionTypes.ATOM_CHANGE, e.target);
      });
    });
  }
}

MicroEvent.mixin(StoreView);

export default StoreView;
