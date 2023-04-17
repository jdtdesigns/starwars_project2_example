const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

const Student = require('./Student');

class Tutor extends Model { }

Tutor.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'tutor'
});

Student.belongsToMany(Tutor, { through: 'tutor_student', foreignKey: 'tutor_id' });
Tutor.belongsToMany(Student, { through: 'tutor_student', foreignKey: 'student_id' });

module.exports = Tutor;