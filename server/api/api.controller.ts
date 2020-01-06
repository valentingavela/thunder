import { IRequest, IResponse } from '../models/Express';
import { ISearch, IResult, ISearchPayload, IAuthor } from './search.models';

import { AxiosResponse, AxiosInstance } from 'axios';
import { ISearchItemResponse, ISearchItemPayload, IGetDescriptionResponse } from './searchItem.models';
import { ICategoryResponse, IPathFromRoot } from './category.models';
import { get2DArrayColumn, getMostRepeatedElement } from '../utils/functions';

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
  const { method, url, body, params, apiClient } = req;

  console.info('-----------------------------------------------------------------');
  console.info(method + ' - ' + url);
  console.info('Status: ' + mercadoLibreRes.status + ' ' + mercadoLibreRes.statusText);

  if (method.toLowerCase() === 'post') {
    console.info('Request body: ' + JSON.stringify(body));
  }

  console.info('Params: ' + JSON.stringify(params));

  const descriptions = await getDescriptions(apiClient, params.id);
  const categories = await getCategoryPathFromRoot(apiClient, mercadoLibreRes.data.category_id);

  const payload = createSearchItemPayload(mercadoLibreRes.data, descriptions.data, categories);
  res.send(payload);
}

async function getDescriptions(apiClient: AxiosInstance, descriptionId: string) {
  const url = `/items/${descriptionId}/descriptions`;

  return (await apiClient.get(url)) as AxiosResponse<IGetDescriptionResponse[]>;
}

function createSearchItemPayload(
  data: ISearchItemResponse,
  description: IGetDescriptionResponse[],
  categories: IPathFromRoot[],
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
    author,
    item: {
      categories,
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

async function getCategoryPathFromRoot(apiClient: AxiosInstance, categoryId: string) {
  const categoryPath = await getCategory(apiClient, categoryId);

  return categoryPath.data.path_from_root;
}

async function handleSearchResponse(req: IRequest, res: IResponse, mercadoLibreRes: AxiosResponse<ISearch>) {
  const { method, url, body, params, apiClient } = req;

  console.info('-----------------------------------------------------------------');
  console.info(method + ' - ' + url);
  console.info('Status: ' + mercadoLibreRes.status + ' ' + mercadoLibreRes.statusText);

  if (method.toLowerCase() === 'post') {
    console.info('Request body: ' + JSON.stringify(body));
  }

  console.info('Params: ' + JSON.stringify(params));
  const payload = await createSearchPayload(apiClient, mercadoLibreRes.data);
  res.send(payload);
}

async function createSearchPayload(apiClient: AxiosInstance, data: ISearch) {
  const { results } = data;
  const itemsFound = results.length > 0;

  const categories = itemsFound ? await mapCategories(apiClient, results) : [];

  const payload = {
    author,
    categories,
    items: itemsFound ? mapItems(results) : [],
  };

  return payload;
}

async function mapCategories(apiClient: AxiosInstance, results: IResult[]) {
  const categoriesPromise = results.map(async result => {
    const { category_id } = result;
    const { data } = await getCategory(apiClient, category_id);

    return data;
  });

  const categories = await Promise.all(categoriesPromise);

  return generateCategoryBreadcrumb(categories);
}

function generateCategoryBreadcrumb(categories: ICategoryResponse[]) {
  const categoriesPaths = categories.map(category => category.path_from_root);

  const smallestArrayLength = Math.min(...categoriesPaths.map(arr => arr.length));

  return Array.from({ length: smallestArrayLength }).reduce((acc, _val, i) => {
    const currentColumn = get2DArrayColumn(categoriesPaths, i);
    const { item, times } = getMostRepeatedElement(currentColumn, 'name');
    // @ts-ignore
    if (times > 1) acc = [...acc, item];

    return acc;
  }, []);
}

async function getCategory(apiClient: AxiosInstance, categoryId: string) {
  const url = `/categories/${categoryId}`;

  return (await apiClient.get(url)) as AxiosResponse<ICategoryResponse>;
}

function mapItems(results: IResult[]) {
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

const author: IAuthor = {
  lastname: 'Gavela',
  name: 'Valentín',
};

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
