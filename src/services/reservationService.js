const Reservation = require('../models/Reservation');
const Venue = require('../models/Venue');

async function createReservation({ userId, venueId, date, time, numberOfPeople }) {
    const venue = await Venue.findByPk(venueId);
    if (!venue) throw new Error('Venue not found');

    const existingReservation = await Reservation.findOne({
        where: { venueId, date, time },
    });

    if (existingReservation) {
        throw new Error('Venue already reserved at this time');
    }

    const reservation = await Reservation.create({
        userId,
        venueId,
        date,
        time,
        numberOfPeople,
    });

    return reservation;
}

async function getReservationsByUser(userId) {
    const reservations = await Reservation.findAll({
        where: { userId },
        include: [{ model: Venue, attributes: ['name', 'location'] }],
    });
    return reservations;
}

async function getReservationById(id) {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) throw new Error('Reservation not found');
    return reservation;
}

async function cancelReservation(id, userId) {
    const reservation = await getReservationById(id);
    if (reservation.userId !== userId && req.user.role !== 'admin') {
        throw new Error('Unauthorized to cancel this reservation');
    }
    await reservation.destroy();
}

module.exports = { createReservation, getReservationsByUser, getReservationById, cancelReservation };
