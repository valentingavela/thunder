import { IRequest, IResponse } from '../models/Express';

import config = require('config');
import path = require('path');

const PROJECT_PATH = config.get<string>('PROJECT_PATH');

const ShoppingController = {
  home: async (req: IRequest, res: IResponse) => {
    const { url, username } = req;

    const statsPath = path.resolve(PROJECT_PATH, './dist/stats.json');
    const stats = require(statsPath);

    res.render('main', { stats, title: 'my title', baseurl: url, username });
  },
};

export = ShoppingController;
