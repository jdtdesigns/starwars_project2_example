const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/connection');

const Favorite = require('./Favorite');

class User extends Model {
  async validatePass(pass) {
    const valid = await bcrypt.compare(pass, this.password);

    return valid;
  }
}

User.init({
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        args: true,
        msg: 'You must enter a valid email address.'
      }
    },
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: 6,
        msg: 'Your password must be at least 6 characters in length.'
      }
    },
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'user',
  hooks: {
    async beforeCreate(user) {
      const encrypted = await bcrypt.hash(user.password, 10);

      user.password = encrypted;
    }
  }
});

User.hasMany(Favorite);
Favorite.belongsTo(User);

module.exports = User;