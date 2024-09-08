const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Venue = sequelize.define(
  'Venue',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Venue;
