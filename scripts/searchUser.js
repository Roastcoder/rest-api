const db = require('../config/database');

async function searchUser() {
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', ['yogendra6378@gmail.com']);
    
    if (rows.length > 0) {
      console.log('User found:', rows[0]);
    } else {
      console.log('User not found with email: yogendra6378@gmail.com');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Database error:', error.message);
    process.exit(1);
  }
}

searchUser();