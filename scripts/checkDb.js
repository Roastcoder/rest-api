const db = require('../config/database');

async function checkExistingTables() {
  try {
    const [tables] = await db.execute('SHOW TABLES');
    console.log('Existing tables:');
    tables.forEach(table => {
      console.log(`- ${Object.values(table)[0]}`);
    });

    // Check specific tables structure
    const tablesToCheck = ['users', 'roles', 'permissions', 'api_keys'];
    
    for (const table of tablesToCheck) {
      try {
        const [columns] = await db.execute(`DESCRIBE ${table}`);
        console.log(`\n${table} structure:`);
        columns.forEach(col => {
          console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : ''} ${col.Key ? col.Key : ''}`);
        });
      } catch (error) {
        console.log(`\n${table}: Table does not exist`);
      }
    }
  } catch (error) {
    console.error('Database check failed:', error.message);
  } finally {
    process.exit();
  }
}

checkExistingTables();