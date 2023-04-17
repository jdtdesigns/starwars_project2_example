const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Course extends Model { }

Course.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'course'
});

module.exports = Course;