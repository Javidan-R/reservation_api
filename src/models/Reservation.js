const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Venue = require('./Venue');

const Reservation = sequelize.define(
  'Reservation',
  {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    numberOfPeople: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Associations
Reservation.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Reservation.belongsTo(Venue, { foreignKey: 'venueId', onDelete: 'CASCADE' });

module.exports = Reservation;
