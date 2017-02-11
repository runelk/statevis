import { GraphView, StoreView } from './gui';
import { StoreView } from './gui';
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
graph_view.setup(store);
store_view.setup(store);

controller.setup(graph_view, store, store_view);

window.statevis = controller;
