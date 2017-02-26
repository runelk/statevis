const request = require('superagent');

const fromUrl = (url, callback) => {
  request
    .get(url)
    .end((err, res) => {
      if (err) {
        throw err;
      }
      callback(JSON.parse(res.text));
    });
};

export { fromUrl };
