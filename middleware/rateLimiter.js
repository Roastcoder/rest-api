const rateLimits = {
  general: (req, res, next) => next(),
  auth: (req, res, next) => next(),
  kyc: (req, res, next) => next(),
  payout: (req, res, next) => next()
};

module.exports = rateLimits;