const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Favorite extends Model { }

Favorite.init({
  character_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'favorite'
});

module.exports = Favorite;