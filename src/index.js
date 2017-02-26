import { GraphView, StoreView } from './gui';
import Controller from './Controller';
import Store from './Store';
import { fromUrl } from './importer';

import { ActionTypes } from './constants';

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

// TODO check out http://js.cytoscape.org/ , http://sigmajs.org/ , https://github.com/Linkurious/linkurious.js
