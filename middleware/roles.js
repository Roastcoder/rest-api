const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

const checkPermission = (permission) => {
  return async (req, res, next) => {
    try {
      const db = require('../config/database');
      
      const [rows] = await db.execute(`
        SELECT p.name FROM permissions p
        JOIN role_permissions rp ON p.id = rp.permission_id
        JOIN users u ON u.role = rp.role_id
        WHERE u.id = ? AND p.name = ?
      `, [req.user.id, permission]);

      if (rows.length === 0) {
        return res.status(403).json({ error: 'Permission denied' });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: 'Permission check failed' });
    }
  };
};

const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager', 
  ADVISOR: 'advisor',
  CHANNEL_PARTNER: 'channel_partner'
};

module.exports = { checkRole, checkPermission, ROLES };