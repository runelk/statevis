const vis = require('vis');

class Visualizer {

  constructor(targetId) {
    this.target = document.querySelector(targetId);
    this.nodes = [];
    this.edges = [];
    this.nodeMap = {};
  }

  setup(data) {
    this.constructNodes(data.entities);
    this.constructEdges(data.events);
    this.network = new vis.Network(
      this.target,
      {
        nodes: this.nodes,
        edges: this.edges
      },
      {}
    );
  }

  constructNodes(entities) {
    entities.forEach((entity, index) => {
      this.nodeMap[entity.name] = index;
      this.nodes.push({
        id: index,
        label: entity.name
      });
    });
  }

  constructEdges(events) {
    events.forEach(event => {
      let sub = event[0],
          act = event[1],
          obj = event[2];

      this.edges.push({
        from: this.nodeMap[sub],
        to: this.nodeMap[obj],
        label: act
      });
    });
  }

  // See http://visjs.org/docs/network/#Events for event overview

  onSelect(callback) {
    this.network.on('select', callback);
  }

  onSelectNode(callback) {
    this.network.on('selectNode', callback);
  }

  onSelectEdge(callback) {
    this.network.on('selectEdge', callback);
  }

  onDeselectNode(callback) {
    this.network.on('deselectNode', callback);
  }

  onDeselectEdge(callback) {
    this.network.on('deselectEdge', callback);
  }

  onHoverNode(callback) {
    this.network.on('hoverNode', callback);
  }

  onHoverEdge(callback) {
    this.network.on('hoverEdge', callback);
  }

  onBlurNode(callback) {
    this.network.on('blurNode', callback);
  }

  onBlurEdge(callback) {
    this.network.on('blurEdge', callback);
  }

  onClick(callback) {
    this.network.on('click', callback);
  }

  onDoubleClick(callback) {
    this.network.on('doubleClick', callback);
  }
}

export default Visualizer;
