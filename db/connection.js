const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee_db',
    password:"",
  });

  connection.connect(function(err){
    if (err) throw err
  })

  module.exports = connection; 