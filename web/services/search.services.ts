import AxiosWrapper from '../utils/axios';
import { ISearchResponse, ISearchItemResponse } from '@models/shopping';

class SearchServices {
  private axios: AxiosWrapper;

  constructor() {
    this.axios = new AxiosWrapper({ use500Interceptor: true });
  }

  getProducts(productName: string) {
    const params = {
      q: productName,
      limit: 4,
    };

    return this.axios.get<Promise<ISearchResponse>>(`/items`, { params });
  }

  getProductDetail(productId: string) {
    return this.axios.get<Promise<ISearchItemResponse>>(`/items/${productId}`);
  }
}

const instance = new SearchServices();
Object.freeze(instance);

export default instance;
