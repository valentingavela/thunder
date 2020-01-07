import { IRequest, IResponse } from '../models/Express';
import { ISearch, IResult, ISearchPayload, IAuthor } from './search.models';

import { AxiosResponse } from 'axios';
import { ISearchItemResponse, ISearchItemPayload, IGetDescriptionResponse } from './searchItem.models';
import { ICategoryResponse, IPathFromRoot } from './category.models';
import { get2DArrayColumn, getMostRepeatedElement, mapPrice, handleErrorResponse } from '../utils/functions';
import apiCli from '../services/apiClient.service';

const GetItemController = {
  getItem: (req: IRequest, res: IResponse) => {
    const { params } = req;

    apiCli
      .getItem({ productId: params.id })
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

  const descriptions = await apiCli.getDescriptions({ descriptionId: params.id });

  const {
    data: { path_from_root },
  } = await apiCli.getCategory({ categoryId: mercadoLibreRes.data.category_id });

  const payload = createSearchItemPayload(mercadoLibreRes.data, descriptions.data, path_from_root);
  res.send(payload);
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

const author: IAuthor = {
  lastname: 'Gavela',
  name: 'Valentín',
};

export = GetItemController;
