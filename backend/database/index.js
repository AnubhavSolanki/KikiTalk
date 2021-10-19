var mysql = require('mysql2');
var connection = mysql.createConnection(require("./dbAuth"));

connection.connect((err)=>{
    if(err) throw err;
    console.log("DB Connected!");
})

module.exports = connection;
