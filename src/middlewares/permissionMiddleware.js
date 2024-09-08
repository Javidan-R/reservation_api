const Permission = require('../models/Permission');

module.exports = (requiredPermission) => async (req, res, next) => {
  try {
    const userPermissions = await req.user.getPermissions();
    const hasPermission = userPermissions.some(permission => permission.name === requiredPermission);
    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
