import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import { __TIMEOUT__ } from '@constants/global';
import { navigateToError } from '@utils/navigation.utils';
export default class AxiosWrapper {
  private instance: AxiosInstance;
  private defaultOptions: AxiosOptions = {
    use500Interceptor: false,
    useCache: false,
  };

  constructor(options?: AxiosOptions) {
    options = Object.assign(this.defaultOptions, options);
    this.instance = axios.create(this.getConfig(options));
    const errorInterceptor = options.use500Interceptor ? this.error500Redirect : this.errorInterceptor;
    this.instance.interceptors.response.use(this.successInterceptor, errorInterceptor);
  }

  get<T>(url: string, config?: AxiosRequestConfig): T {
    return this.instance.get(url, config) as any;
  }

  post<T>(url: string, data: any, config?: AxiosRequestConfig): T {
    return this.instance.post(url, data, config) as any;
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete(url, config);
  }

  request<T>(config: AxiosRequestConfig): T {
    return this.instance.request(config) as any;
  }

  head(url: string, config?: AxiosRequestConfig) {
    return this.instance.head(url, config);
  }

  put<T>(url: string, data: any, config?: AxiosRequestConfig): T {
    return this.instance.put(url, data, config) as any;
  }

  patch<T>(url: string, data: any, config?: AxiosRequestConfig): T {
    return this.instance.patch(url, data, config) as any;
  }

  private successInterceptor = (response: AxiosResponse) => response.data;
  private error500Redirect = () => navigateToError('500');
  private errorInterceptor = (error: any) => {
    // custom error response code to force app to redirect
    if (error.response.status === 533) {
      // @ts-ignore
      window.location.href = `${error.response.data.urlToRedirect}&url=${window.__CURRENT_VIEW__}`;
      return;
    }

    if (!error.response) {
      error.response = { data: { code: 503, message: 'Service Unavailable' } };
    }

    return Promise.reject(error);
  };

  private getConfig({ useCache }: AxiosOptions): AxiosRequestConfig {
    const baseURL = 'todosetbaseURL';

    return {
      baseURL,
      timeout: __TIMEOUT__,
      adapter: cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: useCache }),
    };
  }
}

export interface AxiosOptions {
  useCache?: boolean;
  use500Interceptor?: boolean;
}
