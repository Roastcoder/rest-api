const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const userRole = req.user.role || req.user.user_type;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

const checkPermission = (permission) => {
  return async (req, res, next) => {
    next(); // Skip permission check for now
  };
};

const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager', 
  ADVISOR: 'advisor',
  CHANNEL_PARTNER: 'channel_partner'
};

module.exports = { checkRole, checkPermission, ROLES };