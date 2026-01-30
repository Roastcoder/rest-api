const helmet = require('helmet');
const cors = require('cors');

const securityConfig = {
  helmet: helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"]
      }
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  }),

  cors: cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['https://finonest.com', 'https://cards.finonest.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
  }),

  blockBrowserAccess: (req, res, next) => {
    const userAgent = req.get('User-Agent') || '';
    const isApiKey = req.headers['x-api-key'];
    const isJWT = req.headers.authorization;

    if (!isApiKey && !isJWT && userAgent.includes('Mozilla')) {
      return res.status(403).json({ error: 'Direct browser access not allowed' });
    }
    next();
  }
};

module.exports = securityConfig;