// config/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Thay bằng username của bạn
  password: 'khuong2201', // <<<<<< THAY BẰNG MẬT KHẨU CỦA BẠN
  database: 'quanly_lichday',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("MySQL Connection Pool Created Successfully!");

module.exports = pool;