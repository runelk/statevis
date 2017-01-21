const StateMachine = require('javascript-state-machine');
const vis = require('vis');
const request = require('superagent');

import Editor from './editor';
import Visualizer from './visualizer';
import StateManager from './state_manager';
import Controller from './controller';
import { fromUrl } from './importer';


fromUrl('/testdata', data => {
  const visualizer = new Visualizer('#visualizer');
  const editor = new Editor('#editor');
  const state_manager = new StateManager();
  const controller = new Controller();

  visualizer.setup(data);
  editor.setup();
  state_manager.setup(visualizer.edges, data.start);
  controller.setup(visualizer, editor, state_manager);

  window.statevis = controller;
});
