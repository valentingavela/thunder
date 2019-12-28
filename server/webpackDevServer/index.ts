import path = require('path');
import config = require('config');
import webpack = require('webpack');
import webpackDevMiddleware = require('webpack-dev-middleware');
import webpackHotMiddleware = require('webpack-hot-middleware');
import environment = require('../utils/environment.util');

const shouldUseWebpackDevServer = environment.isDevelopment && !process.env.WITHOUT_WEBPACK_DEV_SERVER;

let webpackConfig: any = {};
let compiler: webpack.Compiler = {} as webpack.Compiler;
const PROJECT_PATH = config.get<string>('PROJECT_PATH');

if (environment.isDevelopment || shouldUseWebpackDevServer) {
  // tslint:disable-next-line: no-var-requires
  webpackConfig = require(path.resolve(PROJECT_PATH, './webpack.config.js'));
  compiler = webpack(webpackConfig);
}

const create = () => {
  if (!environment.isDevelopment || !shouldUseWebpackDevServer) {
    return (res: any, req: any, next: any) => {
      next();

      return;
    };
  }

  const devMiddleware = webpackDevMiddleware(compiler, {
    logLevel: 'warn',
    publicPath: webpackConfig.output.publicPath,
    writeToDisk: true,
    serverSideRender: true,
  });

  const hotMiddleware = webpackHotMiddleware(compiler, {
    // tslint:disable-next-line: no-console
    log: console.log,
    path: '/__webpack_hmr',
  });

  return [devMiddleware, hotMiddleware];
};

export = create;
