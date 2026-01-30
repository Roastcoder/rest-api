const db = require('../config/database');

const userPermissionController = {
  getAllUserPermissions: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT up.*, u.name as user_name, u.email as user_email 
        FROM user_permissions up 
        LEFT JOIN users u ON up.user_id = u.id
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserPermissionById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM user_permissions WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'User permission not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUserPermission: async (req, res) => {
    try {
      const { user_id, permission, granted } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO user_permissions (user_id, permission, granted) VALUES (?, ?, ?)`,
        [user_id, permission, granted]
      );
      
      res.status(201).json({ id: result.insertId, message: 'User permission created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUserPermission: async (req, res) => {
    try {
      const { granted } = req.body;
      const [result] = await db.execute('UPDATE user_permissions SET granted = ? WHERE id = ?', [granted, req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User permission not found' });
      }
      
      res.json({ message: 'User permission updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUserPermission: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM user_permissions WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User permission not found' });
      }
      
      res.json({ message: 'User permission deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = userPermissionController;