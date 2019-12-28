import express = require('express');
import cookieParser = require('cookie-parser');
import compression = require('compression');
import webpackDevServer = require('./webpackDevServer');
import config = require('config');
import expressHandlebars = require('express-handlebars');
import path = require('path');
import packageJson = require('../package.json');
import environment = require('./utils/environment.util');
import routes = require('./routes');

const app = express();
const PROJECT_PATH = config.get<string>('PROJECT_PATH');

app.use(webpackDevServer());

/**
 * handlebars configuration.
 */
app.set('view engine', 'handlebars');
app.set('views', path.join(PROJECT_PATH, './server/views'));

const hbs = expressHandlebars.create({
  partialsDir: path.join(PROJECT_PATH, './server/views/partials'),
  layoutsDir: path.join(PROJECT_PATH, './server/views'),
  helpers: {
    appVersion: packageJson.version,
    isProduction: () => environment.isProduction,
    staticContent: () => config.get('staticContent.url'),
    JSONstringify: (object: any) => JSON.stringify(object),
  },
});

app.engine('handlebars', hbs.engine as any);

app.use(express.json({ limit: '10mb' }));

app.use(compression());
app.use(cookieParser());

routes(app);

export = app;
