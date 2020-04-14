'use strict';
const path = require('path');
module.exports = function(server) {
  const router = server.loopback.Router();
  router.get('/status', server.loopback.status());
  router.get('/', function(req, res) {
    const indexFile = path.resolve(__dirname, '../..', server.get('indexFile'));
    res.sendFile(indexFile);
  });
  server.use(router);
};
