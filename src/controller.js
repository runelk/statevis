// const MicroEvent = require('microevent');
import { Editor, Visualizer, StoreView } from './gui';

class Controller {
  setup(visualizer, editor, store, store_view) {
    this.visualizer = visualizer;
    this.editor = editor;
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
      console.log(node);
      this.editor.setCurrent(node.label);
      this.editor.setEdgeList(edges);
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
      console.log('controller store');
      console.log(this.store);
      this.visualizer = new Visualizer('#visualizer');
      this.editor = new Editor('#editor');
      this.store_view = new StoreView('#store-view');

      // TODO update everything properly

      this.visualizer.setup(this.store);
      this.editor.setup();
      this.store_view.setup(this.store);
    });
  }
}

export default Controller;
