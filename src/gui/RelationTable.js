import MicroEvent from 'microevent';
import { ActionTypes } from '../constants';
const template = require('./RelationTable.mustache');

const $ = require( 'jquery' );
const datatables = require('datatables.net');

class RelationTable {
  constructor(targetId) {
    this.target = document.querySelector(targetId);
    this.target.innerHTML = template();

    this.targetTable = this.target.querySelector('table.relations');
    this.table = $(this.targetTable).DataTable({
      columns: [
        { title: 'Sub' },
        { title: 'Rel' },
        { title: 'Obj' }
      ],
      data: [],
      scrollY: '30em',
      paging: false
    });

    console.log("DataTables: " + this.table);

    this.table.on('search.dt', () => {
      this.trigger(ActionTypes.STORE_VIEW_FILTER, {
        relations: Array.from(this.table.rows({filter: 'applied'}).data())
      });
    });
  }

  render(data) {
    this.table.clear();
    this.table.rows.add(data.relations);
    this.table.draw();
  }
}

MicroEvent.mixin(RelationTable);

export default RelationTable;
