const express = require('express');
const PORT = process.env.PORT || 3000;
const api_routes = require('./routes/api_routes');
const db = require('./config/connection');

const app = express();

app.use(express.json());

app.use('/api', api_routes);

db.sync().then(() => {
  app.listen(PORT, () => console.log('Server started on port %s', PORT))
});