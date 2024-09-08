const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Authorization header missing' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token is missing' });

    const decoded = jwt.verify(token, secret);
    const user = await User.findByPk(decoded.userId);
    if (!user) return res.status(401).json({ error: 'Unauthorized: User not found' });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
