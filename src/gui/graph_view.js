const vis = require('vis');
const template = require('./graph_view.mustache');

class GraphView {

  constructor(targetId) {
    this.target = document.querySelector(targetId);
    this.nodes = [];
    this.edges = [];
    this.nodeMap = {};
    this.graphConfig = {
        nodes: {
          color: {
            background: 'rgb(50, 50, 50)',
            border: 'rgb(255, 255, 255)',
            highlight: {
              background: 'rgb(50, 50, 50)',
              border: 'rgb(255, 255, 255)'
            }
          },
          font: {
            color: 'rgb(255, 255, 255)'
          }
        },
        edges: {
          arrows: {
            to: {
              scaleFactor: 0.5
            }
          },
          font: {
            color: 'rgb(255, 255, 255)',
            strokeWidth: 0
          }
        }
    };
  }

  setup() {
    this.target.innerHTML = template();
    this.network = new vis.Network(
      this.target.querySelector('div.graph'),
      {
        nodes: [],
        edges: []
      },
      this.graphConfig
    );
  }

  setData(store) {
    this.constructNodes(store.relations);
    this.constructEdges(store.relations);
    this.network.setData({nodes: this.nodes, edges: this.edges});
  }

  constructNodes(relations) {
    this.nodes = [];
    let uniqueNodes = Array.from(
      new Set(
        relations
          .map(rel => { return [rel[0], rel[2]]; })
          .reduce((a, b) => { return a.concat(b); }))
    );

    uniqueNodes.sort().forEach((node, index) => {
      this.nodeMap[node] = index;
      this.nodes.push({
        id: index,
        label: node
      });
    });
  }

  constructEdges(relations) {
    this.edges = [];
    relations.forEach(relation => {
      this.edges.push({
        from: this.nodeMap[relation[0]],
        label: relation[1],
        to: this.nodeMap[relation[2]]
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

export default GraphView;