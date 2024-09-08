const Venue = require('../models/Venue');
const { Op } = require('sequelize');

async function createVenue(data) {
  const venue = await Venue.create(data);
  return venue;
}

async function getVenues({ page = 1, limit = 10, location }) {
  const offset = (page - 1) * limit;
  const where = {};

  if (location) {
    where.location = { [Op.iLike]: `%${location}%` };
  }

  const { count, rows } = await Venue.findAndCountAll({
    where,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    venues: rows,
  };
}

async function getVenueById(id) {
  const venue = await Venue.findByPk(id);
  if (!venue) throw new Error('Venue not found');
  return venue;
}

async function updateVenue(id, data) {
  const venue = await getVenueById(id);
  await venue.update(data);
  return venue;
}

async function deleteVenue(id) {
  const venue = await getVenueById(id);
  await venue.destroy();
}

module.exports = {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
};
