import { IRequest, IResponse } from '../models/Express';

import config = require('config');

const handleInvalidStatus = (req: IRequest, res: IResponse, status: string) => {
  console.warn('The user request a URL with invalid status');
  res.cookie('invalid-status', { domain: 'mercadolibre.com', secure: false, maxAge: 1000 * 60 * 5 });

  res.redirect(`${config.get('app.base')}${req.url}/invalidStatus`);
};

export = handleInvalidStatus;
