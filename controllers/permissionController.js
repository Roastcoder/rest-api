const db = require('../config/database');

const permissionController = {
  getAllPermissions: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM permissions');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPermissionById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM permissions WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Permission not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createPermission: async (req, res) => {
    try {
      const { name, display_name, category, description } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO permissions (name, display_name, category, description) VALUES (?, ?, ?, ?)`,
        [name, display_name, category, description]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Permission created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updatePermission: async (req, res) => {
    try {
      const { name, display_name, category, description } = req.body;
      const [result] = await db.execute('UPDATE permissions SET name = ?, display_name = ?, category = ?, description = ? WHERE id = ?', [name, display_name, category, description, req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Permission not found' });
      }
      
      res.json({ message: 'Permission updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deletePermission: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM permissions WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Permission not found' });
      }
      
      res.json({ message: 'Permission deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = permissionController;