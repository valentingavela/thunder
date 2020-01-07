import { IRequest, IResponse } from '../models/Express';
import { ISearch, IResult, ISearchPayload, IAuthor } from '../models/search.models';

import { AxiosResponse } from 'axios';
import { ICategoryResponse, IPathFromRoot } from '../models/category.models';
import { get2DArrayColumn, getMostRepeatedElement, mapPrice, handleErrorResponse } from '../utils/functions';
import apiCli from '../services/apiClient.service';

const author: IAuthor = {
  lastname: 'Gavela',
  name: 'Valentín',
};

const searchProductsController = {
  searchProducts: (req: IRequest, res: IResponse) => {
    const { query } = req;

    const params = {
      query: query['q'],
      limit: query['limit'],
    };

    apiCli
      .search(params)
      .then((mercadoLibreRes: AxiosResponse<ISearch>) => handleSearchResponse(req, res, mercadoLibreRes))
      .catch((err: any) => handleErrorResponse(req, res, err));
  },
};

async function handleSearchResponse(req: IRequest, res: IResponse, mercadoLibreRes: AxiosResponse<ISearch>) {
  const { method, url, body, params } = req;

  console.info('-----------------------------------------------------------------');
  console.info(method + ' - ' + url);
  console.info('Status: ' + mercadoLibreRes.status + ' ' + mercadoLibreRes.statusText);

  if (method.toLowerCase() === 'post') {
    console.info('Request body: ' + JSON.stringify(body));
  }

  console.info('Params: ' + JSON.stringify(params));
  const payload = await createSearchPayload(mercadoLibreRes.data);
  res.send(payload);
}

async function createSearchPayload(data: ISearch) {
  const { results } = data;
  const itemsFound = results.length > 0;

  const categories = itemsFound ? await mapCategories(results) : [];

  const payload = {
    author,
    categories,
    items: itemsFound ? mapItems(results) : [],
  };

  return payload;
}

async function mapCategories(results: IResult[]) {
  const categoriesPromise = results.map(async result => {
    const { category_id } = result;
    const { data } = await apiCli.getCategory({ categoryId: category_id });

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
  }, []) as string[];
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

export = searchProductsController;
