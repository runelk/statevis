import { Main } from './gui';
import Controller from './Controller';
import Store from './Store';

import { ActionTypes } from './constants';

const store = new Store();
const main = new Main('#container');
const controller = new Controller();

controller.store = store;
controller.main = main;
controller.initialize();

window.statevis = controller;

// TODO check out http://js.cytoscape.org/ , http://sigmajs.org/ , https://github.com/Linkurious/linkurious.js
