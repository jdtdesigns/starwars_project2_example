const public_router = require('express').Router();
const auth_routes = require('./auth_routes');
const auth_view_routes = require('./auth_view_routes');
const view_routes = require('./view_routes');

// Load the public auth routes at /auth - localhost:3000/auth
public_router.use('/auth', [
  auth_routes,
  auth_view_routes
]);

// Load the public view routes at the root - localhost:3000
public_router.use('/', view_routes);

module.exports = public_router;