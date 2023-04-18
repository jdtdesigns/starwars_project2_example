const private_router = require('express').Router();
const favorite_routes = require('./favorite_routes');
const search_routes = require('./search_routes');

// Load all user routes at the root - localhost:3000
private_router.use('/', [
  favorite_routes,
  search_routes
]);

module.exports = private_router;