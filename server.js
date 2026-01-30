const express = require('express');
const cors = require('cors');
require('dotenv').config();

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

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payouts', payoutRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/aadhaar-verifications', aadhaarVerificationRoutes);
app.use('/api/pan-verifications', panVerificationRoutes);
app.use('/api/bank-verifications', bankVerificationRoutes);
app.use('/api/kyc-submissions', kycSubmissionRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/withdrawal-requests', withdrawalRequestRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/api-keys', apiKeyRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/user-permissions', userPermissionRoutes);
app.use('/api/role-permissions', rolePermissionRoutes);
app.use('/api/lead-status-history', leadStatusHistoryRoutes);
app.use('/api/payout-ledger', payoutLedgerRoutes);
app.use('/api/payout-settings', payoutSettingRoutes);
app.use('/api/referral-extended', referralExtendedRoutes);
app.use('/api/misc', miscRoutes);

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