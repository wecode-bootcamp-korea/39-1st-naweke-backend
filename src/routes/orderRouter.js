const express = require('express');

const orderController = require('../controlloers/orderController');

const { validateAccessToken } = require('../middlewares/validateAccessToken');

const orderRouter = express.Router();

orderRouter.get('/', validateAccessToken, orderController.getOrderList);

module.exports = { orderRouter };