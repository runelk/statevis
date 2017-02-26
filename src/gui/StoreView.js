import MicroEvent from 'microevent';
import { ActionTypes } from '../constants';
import EntityList from './EntityList';
import RelationTable from './RelationTable';
const template = require('./StoreView.mustache');

// TODO use holmes for filtering (https://haroen.me/holmes/)

class StoreView {
  constructor(targetId) {
    this.target = document.querySelector(targetId);
    this.target.innerHTML = template();
    this.relationTable = new RelationTable('div.relations');
    this.entityList = new EntityList('div.entities');
  }

  onLoad(evt) {
    this.trigger(ActionTypes.STORE_VIEW_LOAD, evt.target.files);
  }

  updateView(store) {
    this.relationTable.render(store);
    this.entityList.render(store);
    document.querySelector("#input-load").addEventListener("change", this.onLoad.bind(this), false);
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
