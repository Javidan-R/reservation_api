const express = require('express');
const {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
} = require('../controllers/permissionController');

const router = express.Router();

router.post('/', createPermission); 
router.get('/', getAllPermissions); 
router.get('/:id', getPermissionById); 
router.put('/:id', updatePermission); 
router.delete('/:id', deletePermission); 

module.exports = router;
