import MicroEvent from 'microevent';
import { ActionTypes } from './constants';
import { fromUrl } from './importer';


class Controller {

  set store(s) {
    this._store = s;
  }

  set graph_view(gv) {
    this._graph_view = gv;
  }

  set store_view(sv) {
    this._store_view = sv;
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
    this._graph_view.updateView(this._store);
    this._store_view.updateView(this._store);
    this.setupEvents();
  }

  loadData(data) {
    this._store.setup(data);
  }

  setupEvents() {
    this._graph_view.onSelectNode(params => {
      console.log("selectNode");
      console.log(params);
      let node_num = params.nodes[0],
          edges = params.edges,
          node = this._graph_view.nodes[node_num];
    });

    this._graph_view.onSelectEdge(params => {
      console.log("selectEdge");
      console.log(params);
    });

    this._store_view.bind(ActionTypes.STORE_VIEW_LOAD, files => {
      // TODO support more than one file
      let reader = new FileReader();
      reader.onload = evt => {
        let data = JSON.parse(evt.target.result);
        this.loadData(data);
      };
      reader.readAsText(files[0]);
    });

    this._store.bind(ActionTypes.STORE_SETUP_DONE, () => {
      this._graph_view.updateView(this._store);
      this._store_view.updateView(this._store);
    });

    this._store_view.bind(ActionTypes.ATOM_INPUT, (target) => {
      console.log(ActionTypes.ATOM_INPUT);
      console.log(target);
    });

    this._store_view.bind(ActionTypes.ATOM_CHANGE, (target) => {
      console.log(ActionTypes.ATOM_CHANGE);
    });

    this._store_view.relationTable.bind(ActionTypes.STORE_VIEW_FILTER, (data) => {
      console.log(ActionTypes.STORE_VIEW_FILTER);
      console.log(data);
      this._graph_view.updateView(data);
    });
  }
}

export default Controller;
