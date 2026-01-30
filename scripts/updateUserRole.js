const db = require('../config/database');

async function updateUserRole() {
  try {
    const [result] = await db.execute(
      'UPDATE users SET role_id = 1 WHERE email = ?',
      ['yogendra6378@gmail.com']
    );
    
    console.log('User role updated to admin');
    console.log('Affected rows:', result.affectedRows);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

updateUserRole();