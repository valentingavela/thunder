import http = require('http');
import config = require('config');
import app = require('./app');

const port = config.get('api.port');
const server = http.createServer(app);

server.listen(port, () => {
  console.info(`\nApp running at port ${port}!\n`);
});
