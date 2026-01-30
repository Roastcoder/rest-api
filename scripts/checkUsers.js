const db = require('../config/database');

async function checkUsers() {
  try {
    const [rows] = await db.execute('SELECT id, name, email FROM users LIMIT 10');
    console.log('Users in database:', rows);
    process.exit(0);
  } catch (error) {
    console.error('Database error:', error.message);
    process.exit(1);
  }
}

checkUsers();