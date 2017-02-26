import MicroEvent from 'microevent';
import { ActionTypes } from './constants';
import { fromUrl } from './importer';


class Controller {

  set store(s) {
    this._store = s;
  }

  set main(main) {
    this._main = main;
  }

  set graph_view(gv) {
    this._main.graphView = gv;
  }

  set store_view(sv) {
    this._main.storeView = sv;
  }

  initialize() {
    // TODO remove the need for this
    this.loadData({
      relations: [["", "", ""]],
      start: ""
    });
    this.initializeViews();
    fromUrl('/testdata', data => {
      this.loadData(data);
    });
  }

  initializeViews() {
    this._main.updateView(this._store);
    this.setupEvents();
  }

  loadData(data) {
    this._store.setup(data);
  }

  setupEvents() {
    console.log(this._main);

    this._main.graphView.onSelectNode(params => {
      console.log("selectNode");
      console.log(params);
      let node_num = params.nodes[0],
          edges = params.edges,
          node = this._main.graphView.nodes[node_num];
    });

    this._main.graphView.onSelectEdge(params => {
      console.log("selectEdge");
      console.log(params);
    });

    this._main.storeView.bind(ActionTypes.STORE_VIEW_LOAD, files => {
      // TODO support more than one file
      let reader = new FileReader();
      reader.onload = evt => {
        let data = JSON.parse(evt.target.result);
        this.loadData(data);
      };
      reader.readAsText(files[0]);
    });

    this._store.bind(ActionTypes.STORE_SETUP_DONE, () => {
      this._main.graphView.updateView(this._store);
      this._main.storeView.updateView(this._store);
    });

    this._main.storeView.bind(ActionTypes.ATOM_INPUT, (target) => {
      console.log(ActionTypes.ATOM_INPUT);
      console.log(target);
    });

    this._main.storeView.bind(ActionTypes.ATOM_CHANGE, (target) => {
      console.log(ActionTypes.ATOM_CHANGE);
    });

    this._main.storeView.relationTable.bind(ActionTypes.STORE_VIEW_FILTER, (data) => {
      console.log(ActionTypes.STORE_VIEW_FILTER);
      console.log(data);
      this._main.graphView.updateView(data);
    });
  }
}

export default Controller;
