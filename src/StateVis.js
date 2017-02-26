import { Main } from './gui';
import { ActionTypes } from './constants';
import Controller from './Controller';
import Store from './Store';

// TODO check out http://js.cytoscape.org/ , http://sigmajs.org/ , https://github.com/Linkurious/linkurious.js

class StateVis {
  constructor(targetId) {
    this.store = new Store();
    this.main = new Main(targetId);
    this.controller = new Controller();
    this.controller.store = this.store;
    this.controller.main = this.main;
    this.controller.initialize();
  }
}


export default StateVis;
