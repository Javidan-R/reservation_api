const Permission = require('../models/Permission');

// Yeni icazə əlavə etmək
const createPermission = async (name, description) => {
  try {
    const permission = await Permission.create({ name, description });
    return permission;
  } catch (error) {
    throw new Error(`Error creating permission: ${error.message}`);
  }
};

// İcazələri əldə etmək (bütün icazələri əldə etmək)
const getAllPermissions = async () => {
  try {
    const permissions = await Permission.findAll();
    return permissions;
  } catch (error) {
    throw new Error(`Error retrieving permissions: ${error.message}`);
  }
};

// Müəyyən bir icazəni əldə etmək
const getPermissionById = async (id) => {
  try {
    const permission = await Permission.findByPk(id);
    if (!permission) {
      throw new Error('Permission not found');
    }
    return permission;
  } catch (error) {
    throw new Error(`Error retrieving permission: ${error.message}`);
  }
};

// İcazəni yeniləmək
const updatePermission = async (id, updates) => {
  try {
    const permission = await Permission.findByPk(id);
    if (!permission) {
      throw new Error('Permission not found');
    }
    await permission.update(updates);
    return permission;
  } catch (error) {
    throw new Error(`Error updating permission: ${error.message}`);
  }
};

// İcazəni silmək
const deletePermission = async (id) => {
  try {
    const permission = await Permission.findByPk(id);
    if (!permission) {
      throw new Error('Permission not found');
    }
    await permission.destroy();
    return { message: 'Permission deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting permission: ${error.message}`);
  }
};

module.exports = {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};
    