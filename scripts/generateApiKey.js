const db = require('../config/database');
const crypto = require('crypto');

async function generateApiKey() {
  try {
    // Generate a random API key
    const apiKey = 'ak_' + crypto.randomBytes(32).toString('hex');
    const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');
    
    const [result] = await db.execute(
      'INSERT INTO api_keys (name, key_hash, key_prefix, user_id, is_active) VALUES (?, ?, ?, ?, ?)',
      ['Test API Key', keyHash, 'ak_', 213, 1] // Using your user ID 213
    );
    
    console.log('API Key generated:', apiKey);
    console.log('API Key ID:', result.insertId);
    
    process.exit(0);
  } catch (error) {
    console.error('Error generating API key:', error.message);
    process.exit(1);
  }
}

generateApiKey();