class Controller {
  setup(visualizer, editor, state_manager) {
    this.visualizer = visualizer;
    this.editor = editor;
    this.state_manager = state_manager;
    this.setupEvents();
  }

  setupEvents() {
    this.visualizer.onSelectNode(params => {
      console.log("selectNode");
      console.log(params);
      let node_num = params.nodes[0],
          node = this.visualizer.nodes[node_num];
      console.log(node);
      this.editor.setCurrent(node.label);
    });

    this.visualizer.onSelectEdge(params => {
      console.log("selectEdge");
      console.log(params);
    });
  }
}

export default Controller;
