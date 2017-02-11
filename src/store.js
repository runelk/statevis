const MicroEvent = require('microevent');

class Store {
   setup(data) {
     this.relations = data.relations;

     this.entities = Array.from(
       new Set(
         this.relations
           .map(relation => [relation[0], relation[2]])
           .reduce((a, b) => a.concat(b), [])
       )
     ).sort();

     this.start = data.start;
     this.trigger('store-setup-done');
  }
}

MicroEvent.mixin(Store);

export default Store;
