const db = require('../config/database');

const productController = {
  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM products');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get product by ID
  getProductById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new product
  createProduct: async (req, res) => {
    try {
      const { 
        name, category, variant, bank_redirect_url, utm_template_url, 
        commission_rate, status, product_code, card_image, variant_image, 
        product_highlights, payout_source, pin_codes, terms_content 
      } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO products (name, category, variant, bank_redirect_url, 
         utm_template_url, commission_rate, status, product_code, card_image, 
         variant_image, product_highlights, payout_source, pin_codes, terms_content) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, category, variant, bank_redirect_url, utm_template_url, 
         commission_rate, status, product_code, card_image, variant_image, 
         product_highlights, payout_source, pin_codes, terms_content]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Product created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update product
  updateProduct: async (req, res) => {
    try {
      const { 
        name, category, variant, bank_redirect_url, utm_template_url, 
        commission_rate, status, product_code, card_image, variant_image, 
        product_highlights, payout_source, pin_codes, terms_content 
      } = req.body;
      
      const [result] = await db.execute(
        `UPDATE products SET name = ?, category = ?, variant = ?, 
         bank_redirect_url = ?, utm_template_url = ?, commission_rate = ?, 
         status = ?, product_code = ?, card_image = ?, variant_image = ?, 
         product_highlights = ?, payout_source = ?, pin_codes = ?, 
         terms_content = ? WHERE id = ?`,
        [name, category, variant, bank_redirect_url, utm_template_url, 
         commission_rate, status, product_code, card_image, variant_image, 
         product_highlights, payout_source, pin_codes, terms_content, req.params.id]
      );
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.json({ message: 'Product updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete product
  deleteProduct: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get products by category
  getProductsByCategory: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM products WHERE category = ?', [req.params.category]);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get active products
  getActiveProducts: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM products WHERE status = "active"');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = productController;