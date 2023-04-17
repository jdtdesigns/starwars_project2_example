const { Sequelize } = require('sequelize');

const connection = new Sequelize(
  'module_13_overview',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

module.exports = connection;