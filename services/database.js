
const { Pool } = require('pg');

let pool;

try {
  pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TCCSenai',
    password: 'Bicodoce12.',
    port: 5432
  });
  console.log('Database connection pool created successfully.');
} catch (err) {
  console.error('Error creating database connection pool:', err);
  process.exit(-1); // Exit the process with an error code
}
module.exports = pool;