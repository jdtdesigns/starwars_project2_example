const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Student extends Model { }

Student.init({
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'student'
});

module.exports = Student;