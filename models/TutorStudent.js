const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class TutorStudent extends Model { }

TutorStudent.init({
  tutor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tutor',
      key: 'id'
    }
  },
  student_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'student',
      key: 'id'
    }
  }
}, {
  sequelize: db,
  modelName: 'tutor_student',
  freezeTableName: true
});

module.exports = TutorStudent;