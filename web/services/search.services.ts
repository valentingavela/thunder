import AxiosWrapper from '@utils/axios';
import { ISearchResponse } from '@models/shopping';

class SearchServices {
  private axios: AxiosWrapper;

  constructor() {
    this.axios = new AxiosWrapper();
  }

  getProducts(productName: string) {
    const params = {
      q: productName,
      limit: 4,
    };

    return this.axios.get<Promise<ISearchResponse>>(`/items`, { params });
  }
}

const instance = new SearchServices();
Object.freeze(instance);

export default instance;
