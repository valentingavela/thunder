import { ISearch } from 'api/search.models';
import config = require('config');
import AxiosBaseClient = require('../client/index');
import { ISearchItemResponse, IGetDescriptionResponse } from 'api/searchItem.models';
import { ICategoryResponse } from 'api/category.models';

const baseURL = config.get<string>('mercadoLibre.rest.host');

const client = new AxiosBaseClient({ baseURL }).instance;

const apiClient = {
  search: (p: { query: string; limit: string }) => {
    const searchUrl = '/sites/MLA/search';

    const params = {
      limit: p.limit,
      q: p.query,
    };

    return client.get<ISearch>(searchUrl, { params });
  },
  getItem: (p: { productId: string }) => {
    const url = `/items/${p.productId}`;

    return client.get<ISearchItemResponse>(url);
  },
  getCategory: (p: { categoryId: string }) => {
    const url = `/categories/${p.categoryId}`;

    return client.get<ICategoryResponse>(url);
  },
  getDescriptions: (p: { descriptionId: string }) => {
    const url = `/items/${p.descriptionId}/descriptions`;

    return client.get<IGetDescriptionResponse[]>(url);
  },
};

export default apiClient;
