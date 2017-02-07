const MicroEvent = require('microevent');

class Store {
   setup(data) {
     this.relations = data.relations;
     this.start = data.start;
     this.trigger('setup');
     // console.log(this.relations);
  }
}

MicroEvent.mixin(Store);

export default Store;
