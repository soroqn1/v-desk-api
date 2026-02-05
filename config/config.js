require('dotenv').config({ path: __dirname + '/../.env' });

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 60000,
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
