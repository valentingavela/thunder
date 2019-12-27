import expressCore = require('express-serve-static-core');

import express = require('express');
import config = require('config');
import path = require('path');
import errors = require('./errors');

const staticRouter = express.Router();
const apiRouter = express.Router();
const viewsRouter = express.Router();
const PROJECT_PATH = config.get<string>('PROJECT_PATH');

const App = (app: expressCore.Application) => {
  staticRouter.use('/', express.static(path.join(PROJECT_PATH, './dist')));
  apiRouter.use(config.get('api.mercadoLibre.url'), require('./api/api.routes'));

  apiRouter.use((req, res) => {
    res.sendStatus(404);
  });

  viewsRouter.use(require('./controllers/view.routes'));

  app.use(config.get('staticContent.url'), staticRouter);
  app.use(config.get('api.base'), apiRouter);
  app.use(config.get('app.base'), viewsRouter);

  errors(app);
};

export = App;
