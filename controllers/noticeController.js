const db = require('../config/database');

const noticeController = {
  getAllNotices: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM notices');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getNoticeById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM notices WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Notice not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createNotice: async (req, res) => {
    try {
      const { title, message, type, visibility, is_active, created_by, expires_at } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO notices (title, message, type, visibility, is_active, created_by, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, message, type, visibility, is_active, created_by, expires_at]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Notice created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateNotice: async (req, res) => {
    try {
      const { title, message, type, visibility, is_active, expires_at } = req.body;
      const [result] = await db.execute('UPDATE notices SET title = ?, message = ?, type = ?, visibility = ?, is_active = ?, expires_at = ? WHERE id = ?', [title, message, type, visibility, is_active, expires_at, req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Notice not found' });
      }
      
      res.json({ message: 'Notice updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteNotice: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM notices WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Notice not found' });
      }
      
      res.json({ message: 'Notice deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = noticeController;