import config = require('config');
import axios = require('axios');

class AxiosBaseClient {
  instance: axios.AxiosInstance;

  constructor(options: axios.AxiosRequestConfig) {
    options = Object.assign(this.defaultOptions, options);

    this.instance = axios.default.create(options);
  }

  get defaultOptions() {
    return {
      headers: {
        Accept: 'application/json',
      },
      timeout: config.get('rest.timeout'),
      maxRedirects: 10,
      maxContentLength: 50 * 1000 * 1000, // 50MB
    };
  }
}

export = AxiosBaseClient;
