import { IRequest, IResponse, INext } from '../models/Express';
import { AxiosInstance } from 'axios';

import AxiosBaseClient = require('../client');
import config = require('config');

const apiBaseURL = config.get<string>('mercadoLibre.rest.host');

// tslint:disable-next-line: prefer-const
let ajaxClient: AxiosInstance;

const setApiClient = (req: IRequest, _res: IResponse, next: INext) => {
  const client = getBaseClient(ajaxClient, apiBaseURL);
  req.apiClient = client;

  next();
};

function getBaseClient(client: AxiosInstance, baseURL: string) {
  if (client) return client;
  client = new AxiosBaseClient({ baseURL }).instance;

  return client;
}

export = setApiClient;
