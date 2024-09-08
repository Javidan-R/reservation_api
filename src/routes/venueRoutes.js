const express = require('express');
const router = express.Router();
const {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue
} = require('../controllers/venueController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes
router.post('/', authMiddleware, createVenue);
router.get('/', getVenues);
router.get('/:id', getVenueById);
router.put('/:id', authMiddleware, updateVenue);
router.delete('/:id', authMiddleware, deleteVenue);

module.exports = router;
