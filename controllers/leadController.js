const db = require('../config/database');

const leadController = {
  // Get all leads
  getAllLeads: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT l.*, p.name as product_name, u.name as user_name 
        FROM leads l 
        LEFT JOIN products p ON l.product_id = p.id 
        LEFT JOIN users u ON l.channel_code = u.channel_code
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get lead by ID
  getLeadById: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT l.*, p.name as product_name, u.name as user_name 
        FROM leads l 
        LEFT JOIN products p ON l.product_id = p.id 
        LEFT JOIN users u ON l.channel_code = u.channel_code 
        WHERE l.id = ?
      `, [req.params.id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Lead not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new lead
  createLead: async (req, res) => {
    try {
      const { 
        lead_id, mobile, email, product_id, channel_code, advisor_name, status,
        bank_response, commission, unique_utm_id, customer_name, monthly_income,
        loan_amount, phone, remark, activation_status, final_redirect_url,
        card_variant_mis, application_no_mis, cust_type, card_issued_date,
        vkyc_status, bkyc_status, disbursed_amount
      } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO leads (lead_id, mobile, email, product_id, channel_code, 
         advisor_name, status, bank_response, commission, unique_utm_id, 
         customer_name, monthly_income, loan_amount, phone, remark, 
         activation_status, final_redirect_url, card_variant_mis, 
         application_no_mis, cust_type, card_issued_date, vkyc_status, 
         bkyc_status, disbursed_amount) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [lead_id, mobile, email, product_id, channel_code, advisor_name, status,
         bank_response, commission, unique_utm_id, customer_name, monthly_income,
         loan_amount, phone, remark, activation_status, final_redirect_url,
         card_variant_mis, application_no_mis, cust_type, card_issued_date,
         vkyc_status, bkyc_status, disbursed_amount]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Lead created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update lead
  updateLead: async (req, res) => {
    try {
      const { 
        status, bank_response, commission, remark, activation_status,
        card_variant_mis, application_no_mis, cust_type, card_issued_date,
        vkyc_status, bkyc_status, disbursed_amount
      } = req.body;
      
      const [result] = await db.execute(
        `UPDATE leads SET status = ?, bank_response = ?, commission = ?, 
         remark = ?, activation_status = ?, card_variant_mis = ?, 
         application_no_mis = ?, cust_type = ?, card_issued_date = ?, 
         vkyc_status = ?, bkyc_status = ?, disbursed_amount = ? WHERE id = ?`,
        [status, bank_response, commission, remark, activation_status,
         card_variant_mis, application_no_mis, cust_type, card_issued_date,
         vkyc_status, bkyc_status, disbursed_amount, req.params.id]
      );
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Lead not found' });
      }
      
      res.json({ message: 'Lead updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete lead
  deleteLead: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM leads WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Lead not found' });
      }
      
      res.json({ message: 'Lead deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get leads by channel code
  getLeadsByChannel: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT l.*, p.name as product_name 
        FROM leads l 
        LEFT JOIN products p ON l.product_id = p.id 
        WHERE l.channel_code = ?
      `, [req.params.channelCode]);
      
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get leads by status
  getLeadsByStatus: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM leads WHERE status = ?', [req.params.status]);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = leadController;