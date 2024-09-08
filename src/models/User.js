const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Permission = require('./Permission'); 

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  },
}, {
  timestamps: true,
});

User.belongsToMany(Permission, { through: 'UserPermissions' });
Permission.belongsToMany(User, { through: 'UserPermissions' });

module.exports = User;
