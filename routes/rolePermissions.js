const express = require('express');
const router = express.Router();
const rolePermissionController = require('../controllers/rolePermissionController');

router.get('/', rolePermissionController.getAllRolePermissions);
router.get('/:id', rolePermissionController.getRolePermissionById);
router.post('/', rolePermissionController.createRolePermission);
router.delete('/:id', rolePermissionController.deleteRolePermission);

module.exports = router;