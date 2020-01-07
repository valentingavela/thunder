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
  rest: {
    timeout: 60 * 1000,
  },
};
