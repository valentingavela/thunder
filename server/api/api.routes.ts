import express = require('express');
import ApiController = require('./api.controller');
import SetApiMiddleware = require('../middlewares/setApiClient.middleware');

const apiRouter = express.Router();

apiRouter.get('*', SetApiMiddleware, ApiController.get);

export = apiRouter;
