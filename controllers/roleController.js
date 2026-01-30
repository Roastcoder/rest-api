const db = require('../config/database');

const roleController = {
  getAllRoles: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM roles');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRoleById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM roles WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Role not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createRole: async (req, res) => {
    try {
      const { name, display_name, description } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO roles (name, display_name, description) VALUES (?, ?, ?)`,
        [name, display_name, description]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Role created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateRole: async (req, res) => {
    try {
      const { name, display_name, description } = req.body;
      const [result] = await db.execute('UPDATE roles SET name = ?, display_name = ?, description = ? WHERE id = ?', [name, display_name, description, req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Role not found' });
      }
      
      res.json({ message: 'Role updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteRole: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM roles WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Role not found' });
      }
      
      res.json({ message: 'Role deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = roleController;