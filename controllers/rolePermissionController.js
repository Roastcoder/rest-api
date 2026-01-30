const db = require('../config/database');

const rolePermissionController = {
  getAllRolePermissions: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT rp.*, r.name as role_name, p.name as permission_name 
        FROM role_permissions rp 
        LEFT JOIN roles r ON rp.role_id = r.id 
        LEFT JOIN permissions p ON rp.permission_id = p.id
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRolePermissionById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM role_permissions WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Role permission not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createRolePermission: async (req, res) => {
    try {
      const { role_id, permission_id } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)`,
        [role_id, permission_id]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Role permission created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteRolePermission: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM role_permissions WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Role permission not found' });
      }
      
      res.json({ message: 'Role permission deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = rolePermissionController;