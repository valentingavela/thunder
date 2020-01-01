import { IRequest, IResponse } from '../models/Express';
import { ISearch, IResult, IFilter, IAvailablefilter, ISearchPayload } from './search.models';

import { AxiosResponse } from 'axios';
import { ISearchItemResponse, ISearchItemPayload, IGetDescriptionResponse } from './searchItem.models';

const ApiController = {
  searchProducts: (req: IRequest, res: IResponse) => {
    const { url, apiClient, query } = req;

    const searchUrl = '/sites/MLA/search';

    const params = {
      q: query['q'],
      limit: query['limit'],
    };

    apiClient
      .get(searchUrl, { params })
      .then((mercadoLibreRes: AxiosResponse<ISearch>) => handleSearchResponse(req, res, mercadoLibreRes))
      .catch((err: any) => handleErrorResponse(req, res, err));
  },
  getItem: (req: IRequest, res: IResponse) => {
    const { apiClient, params } = req;
    const url = `/items/${params.id}`;

    apiClient
      .get(url)
      .then((mercadoLibreRes: AxiosResponse<ISearchItemResponse>) =>
        handleGetItemResponse(req, res, mercadoLibreRes),
      )
      .catch((err: any) => handleErrorResponse(req, res, err));
  },
};

async function handleGetItemResponse(
  req: IRequest,
  res: IResponse,
  mercadoLibreRes: AxiosResponse<ISearchItemResponse>,
) {
  const { method, url, body, params } = req;

  console.info('-----------------------------------------------------------------');
  console.info(method + ' - ' + url);
  console.info('Status: ' + mercadoLibreRes.status + ' ' + mercadoLibreRes.statusText);

  if (method.toLowerCase() === 'post') {
    console.info('Request body: ' + JSON.stringify(body));
  }

  console.info('Params: ' + JSON.stringify(params));

  const descriptions = await getDescriptions(req);

  const payload = createSearchItemPayload(mercadoLibreRes.data, descriptions.data);
  res.send(payload);
}

async function getDescriptions(req: IRequest) {
  const { apiClient, params } = req;
  const url = `/items/${params.id}/descriptions`;

  return (await apiClient.get(url)) as AxiosResponse<IGetDescriptionResponse[]>;
}

function createSearchItemPayload(
  data: ISearchItemResponse,
  description: IGetDescriptionResponse[],
): ISearchItemPayload {
  const {
    currency_id,
    price,
    condition,
    shipping: { free_shipping },
    id,
    pictures,
    sold_quantity,
    title,
  } = data;
  const mappedPrice = mapPrice(currency_id, price);

  return {
    author: {
      name: 'Valentín',
      lastname: 'Gavela',
    },
    item: {
      condition,
      free_shipping,
      id,
      sold_quantity,
      title,
      description: description[0].plain_text,
      picture: pictures[0].url,
      price: mappedPrice,
    },
  };
}

function handleSearchResponse(req: IRequest, res: IResponse, mercadoLibreRes: AxiosResponse<ISearch>) {
  const { method, url, body, params } = req;

  console.info('-----------------------------------------------------------------');
  console.info(method + ' - ' + url);
  console.info('Status: ' + mercadoLibreRes.status + ' ' + mercadoLibreRes.statusText);

  if (method.toLowerCase() === 'post') {
    console.info('Request body: ' + JSON.stringify(body));
  }

  console.info('Params: ' + JSON.stringify(params));

  const payload = createSearchPayload(mercadoLibreRes.data);
  res.send(payload);
}

function createSearchPayload(data: ISearch): ISearchPayload {
  const { available_filters, filters, results } = data;
  const itemsFound = data.results.length > 0;

  const payload = {
    // TODO refactor author because is repeated
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
    const mappedPrice = mapPrice(currency_id, price);

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

function mapPrice(currency: string, rawAmount: number) {
  const [amount, decimals] = String(rawAmount).split('.');

  return {
    currency,
    amount: Number(amount),
    decimals: decimals ? Number(decimals) : 0,
  };
}

function handleErrorResponse(req: IRequest, res: IResponse, err: any) {
  const { method, body, params, url } = req;
  const response = {} as any;

  switch (err && err.response.status) {
    case 404:
      response.code = err.response.status;
      response.message = 'Item Not Found';
      break;

    default:
      response.code = 500;
      response.message = `Internal Server Error: ${err}`;
      break;
  }

  console.error('-----------------------------------------------------------------');
  console.error(method + ' - ' + url);
  console.error('Status: ' + err.response.status + ' ' + err.response.data.message);

  if (method.toLowerCase() === 'post') {
    console.error('Request body: ' + JSON.stringify(body));
  }

  console.error('Params: ' + JSON.stringify(params));
  console.error('error: ' + err);
  console.error('stackTrace error: ' + JSON.stringify(err.stack));

  res.status(response.code).send(response);
}

export = ApiController;
