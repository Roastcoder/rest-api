const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('redis');

const redisClient = Redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
});

const createRateLimit = (windowMs, max, message) => {
  return rateLimit({
    store: new RedisStore({
      client: redisClient,
      prefix: 'rl:'
    }),
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false
  });
};

const rateLimits = {
  general: createRateLimit(15 * 60 * 1000, 100, 'Too many requests'),
  auth: createRateLimit(15 * 60 * 1000, 5, 'Too many login attempts'),
  kyc: createRateLimit(60 * 60 * 1000, 10, 'KYC rate limit exceeded'),
  payout: createRateLimit(60 * 60 * 1000, 50, 'Payout rate limit exceeded')
};

module.exports = rateLimits;