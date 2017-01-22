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
    this.constructEdges(data.actions);
    this.network = new vis.Network(
      this.target,
      {
        nodes: this.nodes,
        edges: this.edges
      },
      {
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
      }
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

  constructEdges(actions) {
    actions.forEach(action => {
      let sub = action[0],
          act = action[1],
          obj = action[2];

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
