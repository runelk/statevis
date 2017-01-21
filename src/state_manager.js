const StateMachine = require('javascript-state-machine');

class StateManager {
  setup(edges, start) {
    this.start = start;
    this.makeEvents(edges);
    this.makeStateMachine();
  }

  makeEvents(edges) {
    this.events = edges.map(edge => {
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
      events: this.events
    });
  }
}

export default StateManager;
