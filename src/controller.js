
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

  initializeViews() {
    this._graph_view.updateView(this._store);
    this._store_view.updateView(this._store);
    this.setupEvents();
  }

  setupEvents() {
    this._graph_view.onSelectNode(params => {
      console.log("selectNode");
      // console.log(params);
      let node_num = params.nodes[0],
          edges = params.edges,
          node = this._graph_view.nodes[node_num];
    });

    this._graph_view.onSelectEdge(params => {
      console.log("selectEdge");
      console.log(params);
    });

    this._store_view.bind('load', files => {
      // TODO support more than one file
      let reader = new FileReader();
      reader.onload = evt => {
        let data = JSON.parse(evt.target.result);
        this._store.setup(data);
      };
      reader.readAsText(files[0]);
    });

    this._store.bind('store-setup-done', () => {
      this._graph_view.updateView(this._store);
      this._store_view.updateView(this._store);
    });
  }
}

export default Controller;
