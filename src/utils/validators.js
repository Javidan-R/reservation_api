const { body } = require('express-validator');

exports.validateRegister = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('role').isIn(['user', 'admin']).withMessage('Invalid role')
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required')
];

exports.validateReservation = [
  body('venueId').isInt().withMessage('Venue ID must be an integer'),
  body('date').isISO8601().withMessage('Date must be in ISO 8601 format'),
  body('time').matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('Time must be in HH:mm:ss format'),
  body('numberOfPeople').isInt({ min: 1 }).withMessage('Number of people must be a positive integer')
];
