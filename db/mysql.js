const mysql = require('mysql');

// 创建数据库连接
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'musicdb'
});

module.exports = pool