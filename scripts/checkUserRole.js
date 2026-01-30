const db = require('../config/database');

async function checkUserRole() {
  try {
    const [rows] = await db.execute(`
      SELECT u.id, u.name, u.email, u.role_id, r.name as role_name 
      FROM users u 
      LEFT JOIN roles r ON u.role_id = r.id 
      WHERE u.email = ?
    `, ['yogendra6378@gmail.com']);
    
    if (rows.length > 0) {
      console.log('User details:', rows[0]);
    } else {
      console.log('User not found');
    }
    
    // Also check available roles
    const [roles] = await db.execute('SELECT * FROM roles');
    console.log('Available roles:', roles);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkUserRole();