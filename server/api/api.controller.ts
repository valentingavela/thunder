import { IRequest, IResponse } from '../models/Express';

const ApiController = {
  get: (req: IRequest, res: IResponse) => {
    const { url, apiClient } = req;

    apiClient
      .get(url)
      .then((mercadoLibreRes: any) => handleSuccessResponse(req, res, mercadoLibreRes))
      .catch((err: any) => handleErrorResponse(req, res, err));
  },
};

function handleSuccessResponse(req: IRequest, res: IResponse, mercadoLibreRes: any) {
  const { method, url, body, params } = req;

  console.info('-----------------------------------------------------------------');
  console.info(method + ' - ' + url);
  console.info('Status: ' + mercadoLibreRes.status + ' ' + mercadoLibreRes.statusText);

  if (method.toLowerCase() === 'post') {
    console.info('Request body: ' + JSON.stringify(body));
  }

  console.info('Params: ' + JSON.stringify(params));
  console.info('Response time: ' + mercadoLibreRes.responseTime + 'ms');

  res.send(mercadoLibreRes.data);
}

function handleErrorResponse(req: IRequest, res: IResponse, err: any) {
  const { method, body, params, url } = req;
  let response = {} as any;

  switch (err && err.code) {
    case 'ENOTFOUND':
      response.code = 502;
      response.message = 'server not reached';
      break;

    case 'ECONNABORTED':
      response.code = 504;
      response.message = 'timeout';
      break;

    default:
      response.code =
        (err.response ? err.response.data.code : 500) || err.response ? err.response.status : 500;
      response = { ...response, ...(err.response ? { ...err.response.data } : { message: 'error' }) };
      break;
  }

  console.error('-----------------------------------------------------------------');
  console.error(method + ' - ' + url);
  console.error('Status: ' + response.code + ' ' + response.message);

  if (method.toLowerCase() === 'post') {
    console.error('Request body: ' + JSON.stringify(body));
  }

  console.error('Params: ' + JSON.stringify(params));
  console.error('error: ' + err);
  console.error('stackTrace error: ' + JSON.stringify(response.stackTrace));

  res.status(response.code).send(response);
}

export = ApiController;
