import { __APP_BASENAME__ } from '@constants/global';
import { matchPath } from 'react-router-dom';

const getNavigationPath = (destination: 'SHOPPING' | '404') => {
  if (destination === 'SHOPPING') return window.__BASEURL__;

  return `${window.__BASEURL__}/${destination.toLocaleLowerCase()}`;
};

const navigateToError = (error: '500' | '404') =>
  window.location.replace(`${window.location.origin}${__APP_BASENAME__}/${error}`);

const navigateToURL = (URL: string, { newTab } = {} as IRedirectOptions) => {
  newTab ? window.open(URL, '_blank') : window.location.replace(URL);
};

const getURLParams = (pathname: string) => {
  const result = matchPath(pathname, {
    exact: false,
    strict: false,
    path: '/:type/:id?/',
  });

  return result && result.params;
};

interface IRedirectOptions {
  newTab?: boolean;
}

export { getNavigationPath, navigateToError, navigateToURL, getURLParams };
