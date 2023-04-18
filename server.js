const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const PORT = process.env.PORT || 3000;
const private_routes = require('./controllers/private');
const public_routes = require('./controllers/public');
const db = require('./config/connection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session({
  httpOnly: true,
  secret: 'some secret',
  resave: false,
  saveUninitialized: true
}));

app.engine('hbs', engine({
  extname: '.hbs', // change the file extension from .handlebars to .hbs
  runtimeOptions: {
    allowProtoPropertiesByDefault: true
  }
}));
app.set('view engine', 'hbs');
app.set('views', './views');

// Load all routes
app.use('/', [private_routes, public_routes]);

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Server started on port %s', PORT))
});