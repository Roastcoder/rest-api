const db = require('../config/database');

async function checkApiKeysTable() {
  try {
    const [rows] = await db.execute('DESCRIBE api_keys');
    console.log('API Keys table structure:', rows);
    
    // Also check existing keys
    const [keys] = await db.execute('SELECT * FROM api_keys LIMIT 5');
    console.log('Existing API keys:', keys);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkApiKeysTable();