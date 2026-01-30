const express = require('express');
require('dotenv').config();

const { validateApiKey } = require('./middleware/apiKey');
const { verifyToken, login } = require('./middleware/jwt');
const { checkRole, ROLES } = require('./middleware/roles');
const rateLimits = require('./middleware/rateLimiter');
const { auditLog } = require('./middleware/logger');
const securityConfig = require('./middleware/security');

const userRoutes = require('./routes/users');
const leadRoutes = require('./routes/leads');
const productRoutes = require('./routes/products');
const payoutRoutes = require('./routes/payouts');
const referralRoutes = require('./routes/referrals');
const aadhaarVerificationRoutes = require('./routes/aadhaarVerifications');
const panVerificationRoutes = require('./routes/panVerifications');
const bankVerificationRoutes = require('./routes/bankVerifications');
const kycSubmissionRoutes = require('./routes/kycSubmissions');
const roleRoutes = require('./routes/roles');
const withdrawalRequestRoutes = require('./routes/withdrawalRequests');
const noticeRoutes = require('./routes/notices');
const settingRoutes = require('./routes/settings');
const apiKeyRoutes = require('./routes/apiKeys');
const permissionRoutes = require('./routes/permissions');
const userPermissionRoutes = require('./routes/userPermissions');
const rolePermissionRoutes = require('./routes/rolePermissions');
const leadStatusHistoryRoutes = require('./routes/leadStatusHistory');
const payoutLedgerRoutes = require('./routes/payoutLedger');
const payoutSettingRoutes = require('./routes/payoutSettings');
const referralExtendedRoutes = require('./routes/referralExtended');
const miscRoutes = require('./routes/misc');
const { authenticateToken } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(securityConfig.helmet);
app.use(securityConfig.cors);
app.use(express.json({ limit: '10mb' }));
app.use(rateLimits.general);
app.use(auditLog);
app.use(securityConfig.blockBrowserAccess);

// Auth routes
app.post('/api/auth/login', rateLimits.auth, login);

// API routes with dual auth (API key OR JWT)
const dualAuth = (req, res, next) => {
  if (req.headers['x-api-key']) {
    return validateApiKey(req, res, next);
  }
  return verifyToken(req, res, next);
};

// Protected routes
app.use('/api/users', dualAuth, checkRole([ROLES.ADMIN, ROLES.MANAGER]), userRoutes);
app.use('/api/leads', dualAuth, leadRoutes);
app.use('/api/products', dualAuth, productRoutes);
app.use('/api/payouts', dualAuth, checkRole([ROLES.ADMIN, ROLES.MANAGER]), payoutRoutes);
app.use('/api/referrals', dualAuth, referralRoutes);
app.use('/api/aadhaar-verifications', dualAuth, aadhaarVerificationRoutes);
app.use('/api/pan-verifications', dualAuth, panVerificationRoutes);
app.use('/api/bank-verifications', dualAuth, bankVerificationRoutes);
app.use('/api/kyc-submissions', dualAuth, rateLimits.kyc, kycSubmissionRoutes);
app.use('/api/roles', dualAuth, checkRole([ROLES.ADMIN]), roleRoutes);
app.use('/api/withdrawal-requests', dualAuth, withdrawalRequestRoutes);
app.use('/api/notices', dualAuth, noticeRoutes);
app.use('/api/settings', dualAuth, checkRole([ROLES.ADMIN]), settingRoutes);
app.use('/api/api-keys', dualAuth, checkRole([ROLES.ADMIN]), apiKeyRoutes);
app.use('/api/permissions', dualAuth, checkRole([ROLES.ADMIN]), permissionRoutes);
app.use('/api/user-permissions', dualAuth, checkRole([ROLES.ADMIN, ROLES.MANAGER]), userPermissionRoutes);
app.use('/api/role-permissions', dualAuth, checkRole([ROLES.ADMIN]), rolePermissionRoutes);
app.use('/api/lead-status-history', dualAuth, leadStatusHistoryRoutes);
app.use('/api/payout-ledger', dualAuth, payoutLedgerRoutes);
app.use('/api/payout-settings', dualAuth, checkRole([ROLES.ADMIN, ROLES.MANAGER]), payoutSettingRoutes);
app.use('/api/referral-extended', dualAuth, referralExtendedRoutes);
app.use('/api/misc', dualAuth, miscRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Lead Management API is running!',
    url: 'http://cardapi.finonest.com',
    endpoints: {
      users: '/api/users',
      leads: '/api/leads',
      products: '/api/products',
      payouts: '/api/payouts',
      referrals: '/api/referrals',
      verifications: {
        aadhaar: '/api/aadhaar-verifications',
        pan: '/api/pan-verifications',
        bank: '/api/bank-verifications'
      },
      kyc: '/api/kyc-submissions',
      roles: '/api/roles',
      permissions: '/api/permissions',
      withdrawals: '/api/withdrawal-requests',
      notices: '/api/notices',
      settings: '/api/settings',
      apiKeys: '/api/api-keys'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API URL: http://cardapi.finonest.com`);
  console.log(`Local URL: http://localhost:${PORT}`);
});