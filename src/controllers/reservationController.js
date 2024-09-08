const Reservation = require('../models/Reservation');
const Venue = require('../models/Venue');
const { validationResult } = require('express-validator');

// Rezervasiya Yaratma
exports.createReservation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { venueId, date, time, numberOfPeople } = req.body;
    const userId = req.user.id; // İstifadəçi ID-si

    try {
        // Məkanın mövcudluğunu yoxlayın
        const existingReservation = await Reservation.findOne({
            where: { venueId, date, time }
        });
        if (existingReservation) {
            return res.status(400).json({ error: 'Reservation already exists for this time.' });
        }

        const reservation = await Reservation.create({ venueId, date, time, numberOfPeople, userId });
        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// İstifadəçinin Rezervasiyalarını Görüntüləmə
exports.getUserReservations = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: Token is missing or invalid' });
        }

        const reservations = await Reservation.findAll({
            where: { userId: req.user.id },
            include: [{ model: Venue, attributes: ['name', 'location'] }],
            order: [['date', 'DESC'], ['time', 'DESC']],
        });

        if (!reservations.length) {
            return res.status(404).json({ message: 'No reservations found' });
        }

        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
};

// Rezervasiya Detallarını Görüntüləmə
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id, {
            include: [{ model: Venue, attributes: ['name', 'location'] }],
        });

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        if (reservation.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        res.json(reservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Rezervasiyanı Ləğv Etmə
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        if (reservation.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await reservation.destroy();
        res.json({ message: 'Reservation cancelled' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
