import express = require('express');
import ApiController = require('./api.controller');
import SetApiMiddleware = require('../middlewares/setApiClient.middleware');

const apiRouter = express.Router();

apiRouter.get('/items/:id', SetApiMiddleware, ApiController.getItem);
apiRouter.get('/items', SetApiMiddleware, ApiController.searchProducts);

export = apiRouter;
