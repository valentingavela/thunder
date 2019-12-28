import { IRequest, IResponse } from '../models/Express';

import config = require('config');
import path = require('path');

const PROJECT_PATH = config.get<string>('PROJECT_PATH');

const CrossViewController = {
  invalid: async (req: IRequest, res: IResponse) => {
    const { url, username } = req;

    console.info('------- VIEW: Invalid Status ------------------------------------');

    const statsPath = path.resolve(PROJECT_PATH, './dist/stats.json');
    const stats = require(statsPath);

    console.info('Render view OK');

    res.render('main', { stats, title: 'the title', baseurl: url, username });
  },
};

export = CrossViewController;
