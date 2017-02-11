import { GraphView, StoreView } from './gui';
import Controller from './controller';
import Store from './store';
import { fromUrl } from './importer';

const store = new Store();
const graph_view = new GraphView('#graph-view');
const store_view = new StoreView('#store-view');
const controller = new Controller();

store.setup({
  relations: [[]],
  start: null
});

controller.store = store;
controller.graph_view = graph_view;
controller.store_view = store_view;
controller.initializeViews();
// controller.setupEvents();

window.statevis = controller;
