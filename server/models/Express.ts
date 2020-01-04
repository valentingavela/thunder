import expressCore = require('express-serve-static-core');
import { AxiosInstance } from 'axios';

export interface IRequest extends expressCore.Request {
  apiClient: AxiosInstance;
  username: string;
}

// tslint:disable-next-line: no-empty-interface
export interface IResponse extends expressCore.Response {}

// tslint:disable-next-line: no-empty-interface
export interface INext extends expressCore.NextFunction {}
