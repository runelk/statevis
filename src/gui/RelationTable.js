import MicroEvent from 'microevent';
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
      data: [
        ["foo", "eats", "bar"],
        ["bar", "likes", "chocolate"],
        ["baz", "eats", "chocolate"]
      ]
    });
  }

  render(data) {
    this.table.clear();
    this.table.rows.add(data.relations);
    this.table.draw();
  }
}

export default RelationTable;
