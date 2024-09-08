const venueService = require('../services/venueService');
const { body, validationResult } = require('express-validator');
const Venue = require('../models/Venue');
const User = require('../models/User');

// Create venue - only admin
exports.createVenue = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, location, capacity, description } = req.body;
    const user = req.user; // İstifadəçi məlumatı middleware-dən
  
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
  
    try {
      const venue = await Venue.create({ 
        name, 
        location, 
        capacity, 
        description, 
        createBy: user.id  // İstifadəçi ID
      });
      res.status(201).json(venue);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
exports.getAllVenues = async (req, res, next) => {
    const venues = await venueService.getVenues(req.query);
    res.json(venues);
};

exports.getVenues = async (req, res) => {
    const { page = 1, limit = 10, location } = req.query;
    const options = {
      where: location ? { location } : {},
      limit: parseInt(limit, 10),
      offset: (parseInt(page, 10) - 1) * parseInt(limit, 10),
    };
      const venues = await Venue.findAndCountAll(options);
      res.json({
        total: venues.count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        venues: venues.rows
      });
  };
  
  exports.getVenueById = async (req, res) => {
    const { id } = req.params;
      const venue = await Venue.findByPk(id);
      if (!venue) {
        return res.status(404).json({ error: 'Venue not found' });
      }
      res.json(venue);
  };

  exports.updateVenue = async (req, res) => {
    const { id } = req.params;
    const { name, location, capacity, description } = req.body;
    const user = req.user;
  
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }  
     const venue = await Venue.findByPk(id);
      if (!venue) {
        return res.status(404).json({ error: 'Venue not found' });
      }
      venue.name = name || venue.name;
      venue.location = location || venue.location;
      venue.capacity = capacity || venue.capacity;
      venue.description = description || venue.description;
      await venue.save();
      res.json(venue);
    
  };
  
  exports.deleteVenue = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    const venue = await Venue.findByPk(id);
      if (!venue) {
        return res.status(404).json({ error: 'Venue not found' });
      }
      await venue.destroy();
      res.status(204).send(); // 204 No Content
  };
  
