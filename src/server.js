const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = 4017;

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/testdata/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  let filename = path.resolve(__dirname, '../data/testdata_01.json');
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    res.send(obj);
  });
});

var server = app.listen(PORT, () => {
    console.log("Listening on port %s...", server.address().port);
});
