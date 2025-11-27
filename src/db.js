const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Brekatona',
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || 'grafica'
};

let pool;

async function ensureDatabase() {
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    port: dbConfig.port
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
  await connection.query(`USE \`${dbConfig.database}\``);
  await connection.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      category VARCHAR(50) NOT NULL,
      price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  const [rows] = await connection.query('SELECT COUNT(*) AS total FROM products');
  if (rows[0].total === 0) {
    await connection.query(
      'INSERT INTO products (name, description, category, price) VALUES (?, ?, ?, ?)',
      [
        'Cartão de visitas com verniz',
        'Cartão de visitas com acabamento em verniz localizado.',
        'Cartão de visita',
        120.0
      ]
    );
  }

  await connection.end();
}

async function initDb() {
  if (pool) return pool;

  await ensureDatabase();

  pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    port: dbConfig.port,
    database: dbConfig.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  return pool;
}

function getPool() {
  if (!pool) {
    throw new Error('O pool de conexões ainda não foi inicializado. Chame initDb() primeiro.');
  }

  return pool;
}

module.exports = { dbConfig, initDb, getPool };
