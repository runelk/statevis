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
    this.graph = new vis.Network(
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

}

export default Visualizer;
