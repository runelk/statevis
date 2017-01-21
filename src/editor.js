
class Editor {
  constructor(targetId) {
    this.target = document.querySelector(targetId);
  }

  setup() {
    this.divGraphInfo = document.createElement('div');
    this.formControls = document.createElement('form');

    this.divGraphInfo.classList.add('graph-info');
    this.formControls.id = 'form-controls';

    this.target.appendChild(this.divGraphInfo);
    this.target.appendChild(this.formControls);

    this.setupGraphInfo();
    this.setupControlForm();
  }

  setupGraphInfo() {
    let ulDetails = document.createElement('ul');
    ulDetails.classList.add('graph-info-details');

    ['li-current', 'li-next', 'li-prev'].forEach(id => {
      let li = document.createElement('li');
      li.id = id;
      ulDetails.appendChild(li);
    });

    this.divGraphInfo.appendChild(ulDetails);
  }

  createControlFormButton(name) {
    let btn = document.createElement('button');
    btn.classList.add('btn');
    btn.name = 'btn-' + name;
    btn.id = 'btn-' + name;
    btn.textContent = name.toUpperCase();
    return btn;
  }

  setupControlForm() {
    let btnReset = this.createControlFormButton('reset');
    this.formControls.appendChild(btnReset);
  }
}

export default Editor;
