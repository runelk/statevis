import { Editor, Visualizer, StoreView } from './gui';
import StateManager from './state_manager';
import Controller from './controller';
import Store from './store';
import { fromUrl } from './importer';

const Dispatcher = require('flux').Dispatcher;
const MicroEvent = require('microevent');

const store = new Store();
const visualizer = new Visualizer('#visualizer');
const editor = new Editor('#editor');
const store_view = new StoreView('#store-view');
// const state_manager = new StateManager();
const controller = new Controller();

store.setup({
  relations: [[]],
  start: null
});
visualizer.setup(store);
editor.setup();
store_view.setup(store);

controller.setup(visualizer, editor, store, store_view);

window.statevis = controller;
