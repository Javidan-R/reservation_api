const permissionService = require('../services/permissionService');

// İcazə yaratmaq
exports.createPermission = async (req, res) => {
  try {
    const { name, description } = req.body;
    const permission = await permissionService.createPermission(name, description);
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Bütün icazələri əldə etmək
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await permissionService.getAllPermissions();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Müəyyən bir icazəni əldə etmək
exports.getPermissionById = async (req, res) => {
  try {
    const id = req.params.id;
    const permission = await permissionService.getPermissionById(id);
    res.json(permission);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// İcazəni yeniləmək
exports.updatePermission = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const permission = await permissionService.updatePermission(id, updates);
    res.json(permission);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await permissionService.deletePermission(id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
