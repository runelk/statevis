const StateMachine = require('javascript-state-machine');
const vis = require('vis');
const request = require('superagent');

class StateVis {

  constructor(data, target) {
    this.target = target;

    this.nodeMap = {};
    this.nodes = [];
    this.edges = [];

    this.constructNodes(data.entities);
    this.constructEdges(data.events);
    this.start = data.start;

    this.makeStateMachine();
    this.makeVisGraph();
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

  makeStateMachine() {
    let converted = this.convert(this.edges);

    this.stateMachine = StateMachine.create({
      initial: '' + this.start,
      events: converted
    });
  }

  makeVisGraph() {
    const data = {
      nodes: this.nodes,
      edges: this.edges
    };
    this.graph = new vis.Network(this.target, data, {});
  }

  convert(edges) {
    return edges.map(edge => {
      return {
        name: edge.label,
        from: '' + edge.from,
        to: '' + edge.to
      };
    });
  }

  toJson() {
    return JSON.stringify({
      initial: this.initial,
      nodes: this.nodes,
      edges: this.edges
    });
  }
}

request
  .get('/testdata')
  .end((err, res) => {
    if (err) {
      throw err;
    }
    const test = new StateVis(JSON.parse(res.text), document.querySelector('#container'));
    window.test = test;
  });
