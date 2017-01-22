class Controller {
  setup(visualizer, editor, state_manager, store, store_view) {
    this.visualizer = visualizer;
    this.editor = editor;
    this.state_manager = state_manager;
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
  }
}

export default Controller;
