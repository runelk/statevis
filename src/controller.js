// const MicroEvent = require('microevent');
// import { Visualizer, StoreView } from './gui';

class Controller {
  setup(visualizer,store, store_view) {
    this.visualizer = visualizer;
    this.store = store;
    this.store_view = store_view;
    this.setupEvents();
  }

  setupEvents() {
    this.visualizer.onSelectNode(params => {
      console.log("selectNode");
      // console.log(params);
      let node_num = params.nodes[0],
          edges = params.edges,
          node = this.visualizer.nodes[node_num];
    });

    this.visualizer.onSelectEdge(params => {
      console.log("selectEdge");
      console.log(params);
    });

    this.store_view.bind('load', files => {
      // TODO support more than one file
      let reader = new FileReader();
      reader.onload = evt => {
        let data = JSON.parse(evt.target.result);
        this.store.setup(data);
      };
      reader.readAsText(files[0]);
    });

    this.store.bind('setup', () => {
      this.visualizer.setup();
      this.store_view.setData(this.store);
      this.visualizer.setData(this.store);
    });
  }
}

export default Controller;
