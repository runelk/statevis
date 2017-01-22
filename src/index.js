import { Editor, Visualizer, StoreView } from './gui';
import StateManager from './state_manager';
import Controller from './controller';
import Store from './store';
import { fromUrl } from './importer';


fromUrl('/testdata', data => {
  const store = new Store();
  const visualizer = new Visualizer('#visualizer');
  const editor = new Editor('#editor');
  const store_view = new StoreView('#store-view');
  const state_manager = new StateManager();
  const controller = new Controller();

  store.setup(data);
  visualizer.setup(data);
  editor.setup();
  state_manager.setup(visualizer.edges, data.start);
  store_view.setup(store);
  controller.setup(visualizer, editor, state_manager, store, store_view);

  window.statevis = controller;
});
