const mysql = require('think-model-mysql');

module.exports = {
  handle: mysql,
  database: 'nideshop',
  prefix: 'nideshop_',
  encoding: 'utf8mb4',
  host: '115.159.79.191',
  port: '3306',
  user: 'octber',
  password: 'root',
  dateStrings: true
};
