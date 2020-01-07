module.exports = {
  PROJECT_PATH: process.cwd(),
  title: 'MercadoLibre',
  app: {
    base: '/',
  },
  api: {
    port: 9290,
    base: '/api',
    mercadoLibre: {
      url: '/mercadolibre',
    },
  },
  mercadoLibre: {
    rest: {
      host: 'https://api.mercadolibre.com',
    },
  },
  staticContent: {
    url: '/thunder/statics',
  },
  xClient: 'thunder',
  rest: {
    timeout: 60 * 1000,
  },
  logger: {
    level: 'debug',
    formatter: function formatter(options) {
      var util = require('util');
      return util.format(
        '%s %s [%s] [%s]: ',
        options.timestamp(),
        options.level.toUpperCase(),
        options.meta.hostname,
        options.meta.uow,
        options.message || '',
      );
    },
    timestamp: function() {
      var moment = require('moment');
      return moment()
        .utcOffset(0)
        .format('YYYY-MM-DD HH:mm:ss.SSS');
    },
    callback: function(err) {
      console.log('ERROR', err);
    },
  },
};
