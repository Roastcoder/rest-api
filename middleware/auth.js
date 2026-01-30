const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // Add your token validation logic here
  // For now, checking if token exists
  if (token === process.env.API_SECRET || token) {
    next();
  } else {
    res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = { authenticateToken };