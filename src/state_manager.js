const StateMachine = require('javascript-state-machine');

class StateManager {
  setup(edges, start) {
    this.start = start;
    this.makeActions(edges);
    this.makeStateMachine();
  }

  makeActions(edges) {
    this.actions = edges.map(edge => {
      return {
        name: edge.label,
        from: '' + edge.from,
        to: '' + edge.to
      };
    });
  }

  makeStateMachine() {
    this.stateMachine = StateMachine.create({
      initial: '' + this.start,
      events: this.actions
    });
  }
}

export default StateManager;
