const express = require('express');
const router = express.Router();
const { createReservation, getUserReservations, getReservationById, deleteReservation } = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateReservation } = require('../utils/validators');

router.post('/', authMiddleware, validateReservation, createReservation);
router.get('/', authMiddleware, getUserReservations);
router.get('/:id', authMiddleware, getReservationById);
router.delete('/:id', authMiddleware, deleteReservation);

module.exports = router;
