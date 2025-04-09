const express = require('express');
const { subscribe ,unSubscribe} = require('../controller/token.controller');
const routes = express.Router();

routes.post('/subscribe', subscribe);
routes.delete('/unsubscribe', unSubscribe);

module.exports = routes;