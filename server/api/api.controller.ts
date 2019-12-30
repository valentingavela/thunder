import { IRequest, IResponse } from '../models/Express';
import { ISearch, IResult, IFilter, IAvailablefilter, ISearchPayload } from './models';

const ApiController = {
  searchProducts: (req: IRequest, res: IResponse) => {
    const { url, apiClient, query } = req;

    const searchBaseUrl = '/sites/MLA/search';

    const params = {
      q: query['q'],
      limit: query['limit'],
    };

    apiClient
      .get(searchBaseUrl, { params })
      .then((mercadoLibreRes: any) => handleSuccessResponse(req, res, mercadoLibreRes))
      .catch((err: any) => handleErrorResponse(req, res, err));
  },
  // getItem: (req: IRequest, res: IResponse) => {
  //   const { apiClient, params } = req;
  //   const url = `/items${params.id}`;
  //   apiClient
  //     .get(url)
  //     .then(mercadoLibreRes => console.log(mercadoLibreRes))
  //     .catch(err => console.log(err));
  // },
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

  const payload = transformSearchResponse(mercadoLibreRes.data);
  res.send(payload);
}

function transformSearchResponse(data: ISearch): ISearchPayload {
  const { available_filters, filters, results } = data;
  const itemsFound = data.results.length > 0;

  const payload = {
    author: {
      name: 'Valentín',
      lastname: 'Gavela',
    },
    categories: itemsFound ? getCategories({ filters, availableFilters: available_filters }) : null,
    items: itemsFound ? getItems(results) : null,
  };

  return payload;
}

function getCategories(params: { availableFilters: IAvailablefilter[]; filters: IFilter[] }): string[] {
  const categoriesByAvailableFilter = params.availableFilters.filter(filter => filter.id === 'category');
  const haveCategoryFilter = categoriesByAvailableFilter.length > 0;

  if (haveCategoryFilter) {
    return categoriesByAvailableFilter[0].values
      .sort((a, b) => a.results - b.results)
      .map(filter => filter.name);
  } else {
    return params.filters.filter(filter => filter.id === 'category')[0].values.map(filter => filter.name);
  }
}

function getItems(results: IResult[]) {
  return results.map(result => {
    const { id, title, price, thumbnail, condition, shipping, currency_id } = result;
    const [amount, decimals] = String(price).split('.');
    const mappedPrice = {
      currency: currency_id,
      amount: Number(amount),
      decimals: decimals ? Number(decimals) : 0,
    };

    return {
      id,
      title,
      condition,
      price: mappedPrice,
      picture: thumbnail,
      free_shipping: shipping.free_shipping,
    };
  });
}

function handleErrorResponse(req: IRequest, res: IResponse, err: any) {
  const { method, body, params, url } = req;
  const response = {} as any;

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
      response.code = 500;
      response.message = `Internal Server Error: ${err}`;
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
