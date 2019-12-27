import modelUtil = require('./utils/model.util');
import expressCore = require('express-serve-static-core');

const error = (app: expressCore.Application) => {
  // Catch 404 error
  app.use((req, res) => {
    const err = new Error('Not Found');
    // @ts-ignore
    err.status = 404;

    // @ts-ignore
    res.render('error', modelUtil.getError(err, err.status));
  });
};

export = error;
