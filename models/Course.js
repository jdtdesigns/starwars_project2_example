const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

const Student = require('./Student');

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

Course.hasMany(Student);
Student.belongsTo(Course);

module.exports = Course;