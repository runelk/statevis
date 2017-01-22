
class Store {
   setup(data) {
     this.entities = data.entities;
     this.actions = data.actions;
     this.relations = data.relations;
     this.start = data.start;
  }
}

export default Store;
