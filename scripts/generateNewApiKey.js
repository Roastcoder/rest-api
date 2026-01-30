const db = require('../config/database');
const crypto = require('crypto');

async function generateNewApiKey() {
  try {
    // Generate a random API key
    const apiKey = 'lms_' + crypto.randomBytes(16).toString('hex');
    
    const [result] = await db.execute(
      'INSERT INTO api_keys (name, api_key, rate_limit, is_active, created_by, channel_code) VALUES (?, ?, ?, ?, ?, ?)',
      ['Yogendra API Key', apiKey, 1000, 1, 213, 'CHA866EF33']
    );
    
    console.log('New API Key generated:');
    console.log('ID:', result.insertId);
    console.log('API Key:', apiKey);
    console.log('Use this key in your requests');
    
    process.exit(0);
  } catch (error) {
    console.error('Error generating API key:', error.message);
    process.exit(1);
  }
}

generateNewApiKey();