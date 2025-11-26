const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'users.db'));
db.exec(`
 CREATE TABLE IF NOT EXISTS users (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 email TEXT UNIQUE NOT NULL,
 password TEXT NOT NULL,
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP
 )
`);
console.log('✓ Database initialized');
module.exports = db;