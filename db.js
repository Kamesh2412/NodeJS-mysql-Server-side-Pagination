var mysql = require('mysql');
var con  = mysql.createPool({
  connectionLimit : 10,
  host            : '',
  user            : '',
  password        : '',
  database        : ''
});

module.exports = {con}