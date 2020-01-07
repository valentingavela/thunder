import express = require('express');
import { searchProducts } from './searchProducts.controllers';
import { getItem } from './getItem.controller';

const apiRouter = express.Router();

apiRouter.get('/items/:id', getItem);
apiRouter.get('/items', searchProducts);

export = apiRouter;
