import { Editor, Visualizer, StoreView } from './gui';
import StateManager from './state_manager';
import Controller from './controller';
import Store from './store';
import { fromUrl } from './importer';

const Dispatcher = require('flux').Dispatcher;
const MicroEvent = require('microevent');

fromUrl('/testdata', data => {
  // console.log(Dispatcher);
  // console.log(MicroEvent);

  MicroEvent.mixin(Editor);
  MicroEvent.mixin(Visualizer);
  MicroEvent.mixin(StoreView);
  MicroEvent.mixin(Controller);
  MicroEvent.mixin(Store);

  const store = new Store();
  const visualizer = new Visualizer('#visualizer');
  const editor = new Editor('#editor');
  const store_view = new StoreView('#store-view');
  const state_manager = new StateManager();
  const controller = new Controller();

  store.setup(data);
  visualizer.setup(store);
  editor.setup();
  store_view.setup(store);
  controller.setup(visualizer, editor, state_manager, store, store_view);

  window.statevis = controller;
});
