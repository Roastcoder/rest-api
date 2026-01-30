const db = require('../config/database');
const bcrypt = require('bcryptjs');

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM users');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new user
  createUser: async (req, res) => {
    try {
      const { 
        name, email, password, phone, city, location, bank_name, account_number, 
        ifsc_code, pan_number, aadhar_number, channel_code, is_admin, user_type, 
        partner_type, payout_program, referred_by, aadhaar_number, aadhaar_name, 
        aadhaar_dob, aadhaar_gender, aadhaar_address, pan_name, pan_father_name, 
        bank_account, bank_ifsc, bank_branch, account_holder_name, pan_dob, role_id 
      } = req.body;
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const [result] = await db.execute(
        `INSERT INTO users (name, email, password, phone, city, location, bank_name, 
         account_number, ifsc_code, pan_number, aadhar_number, channel_code, is_admin, 
         user_type, partner_type, payout_program, referred_by, aadhaar_number, 
         aadhaar_name, aadhaar_dob, aadhaar_gender, aadhaar_address, pan_name, 
         pan_father_name, bank_account, bank_ifsc, bank_branch, account_holder_name, 
         pan_dob, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, email, hashedPassword, phone, city, location, bank_name, account_number, 
         ifsc_code, pan_number, aadhar_number, channel_code, is_admin, user_type, 
         partner_type, payout_program, referred_by, aadhaar_number, aadhaar_name, 
         aadhaar_dob, aadhaar_gender, aadhaar_address, pan_name, pan_father_name, 
         bank_account, bank_ifsc, bank_branch, account_holder_name, pan_dob, role_id]
      );
      
      res.status(201).json({ id: result.insertId, message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update user
  updateUser: async (req, res) => {
    try {
      const { 
        name, email, phone, city, location, bank_name, account_number, ifsc_code, 
        pan_number, aadhar_number, user_type, approved, aadhaar_verified, 
        pan_verified, bank_verified, account_status 
      } = req.body;
      
      const [result] = await db.execute(
        `UPDATE users SET name = ?, email = ?, phone = ?, city = ?, location = ?, 
         bank_name = ?, account_number = ?, ifsc_code = ?, pan_number = ?, 
         aadhar_number = ?, user_type = ?, approved = ?, aadhaar_verified = ?, 
         pan_verified = ?, bank_verified = ?, account_status = ? WHERE id = ?`,
        [name, email, phone, city, location, bank_name, account_number, ifsc_code, 
         pan_number, aadhar_number, user_type, approved, aadhaar_verified, 
         pan_verified, bank_verified, account_status, req.params.id]
      );
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get user by channel code
  getUserByChannelCode: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE channel_code = ?', [req.params.channelCode]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = userController;