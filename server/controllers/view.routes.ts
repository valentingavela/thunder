import express = require('express');
import ShoppingController = require('./shopping.controller');
import CrossController = require('./cross.view.controller');
import modelUtil = require('../utils/model.util');

const router = express.Router();

// ------- SHOPPING ROUTES -------
router.get('/', ShoppingController.home);
router.get('/items/:q', ShoppingController.home);

// ------- CROSS ROUTES -------
router.get('/*/invalidStatus', CrossController.invalid);

// ------- ERROR ROUTES -------
router.get('/500', (req, res) => res.render('error', modelUtil.getError('error')));

module.exports = router;
