const request = require('superagent');

const fromUrl = (url, callback) => {
  request
    .get('/testdata')
    .end((err, res) => {
      if (err) {
        throw err;
      }
      callback(JSON.parse(res.text));
    });
};

export { fromUrl };
