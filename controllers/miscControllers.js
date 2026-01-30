const db = require('../config/database');

// Advisor Products Controller
const advisorProductController = {
  getAllAdvisorProducts: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT ap.*, u.name as advisor_name, p.name as product_name 
        FROM advisor_products ap 
        LEFT JOIN users u ON ap.advisor_id = u.id 
        LEFT JOIN products p ON ap.product_id = p.id
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAdvisorProductById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM advisor_products WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Advisor product not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createAdvisorProduct: async (req, res) => {
    try {
      const { advisor_id, product_id, variant, tracking_code, custom_name, status } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO advisor_products (advisor_id, product_id, variant, tracking_code, custom_name, status) VALUES (?, ?, ?, ?, ?, ?)`,
        [advisor_id, product_id, variant, tracking_code, custom_name, status]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Advisor product created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateAdvisorProduct: async (req, res) => {
    try {
      const { variant, custom_name, status } = req.body;
      const [result] = await db.execute('UPDATE advisor_products SET variant = ?, custom_name = ?, status = ? WHERE id = ?', [variant, custom_name, status, req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Advisor product not found' });
      }
      
      res.json({ message: 'Advisor product updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteAdvisorProduct: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM advisor_products WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Advisor product not found' });
      }
      
      res.json({ message: 'Advisor product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// Product History Controller
const productHistoryController = {
  getAllHistory: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT ph.*, p.name as product_name 
        FROM product_history ph 
        LEFT JOIN products p ON ph.product_id = p.id
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getHistoryById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM product_history WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'History not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createHistory: async (req, res) => {
    try {
      const { product_id, field_name, old_value, new_value, changed_by } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO product_history (product_id, field_name, old_value, new_value, changed_by) VALUES (?, ?, ?, ?, ?)`,
        [product_id, field_name, old_value, new_value, changed_by]
      );
      
      res.status(201).json({ id: result.insertId, message: 'History created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// User Notice Reads Controller
const userNoticeReadController = {
  getAllReads: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT unr.*, u.name as user_name, n.title as notice_title 
        FROM user_notice_reads unr 
        LEFT JOIN users u ON unr.user_id = u.id 
        LEFT JOIN notices n ON unr.notice_id = n.id
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createRead: async (req, res) => {
    try {
      const { user_id, notice_id } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO user_notice_reads (user_id, notice_id) VALUES (?, ?)`,
        [user_id, notice_id]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Read record created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = { advisorProductController, productHistoryController, userNoticeReadController };