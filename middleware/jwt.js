const jwt = require('jsonwebtoken');
const db = require('../config/database');
const crypto = require('crypto');

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role || user.user_type,
      channelCode: user.channel_code 
    },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: '24h' }
  );
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE id = ?',
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = rows[0];
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];
    
    // Simple password check (replace with proper hashing in production)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role || user.user_type,
        channelCode: user.channel_code
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { verifyToken, login, generateToken };