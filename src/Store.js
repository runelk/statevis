import MicroEvent from 'microevent';

import { ActionTypes } from './constants';

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
     this.trigger(ActionTypes.STORE_SETUP_DONE);
  }
}

MicroEvent.mixin(Store);

export default Store;
