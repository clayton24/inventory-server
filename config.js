var config = {
  user: 'postgres', //env var: PGUSER 
  database: 'inventory', //env var: PGDATABASE 
  password: '05k21995', //env var: PGPASSWORD 
  host: '127.0.0.1', // Server hosting the postgres database 
  port: 5432, //env var: PGPORT 
  max: 10, // max number of clients in the pool 
  idleTimeoutMillis: 60000, // how long a client is allowed to remain idle before being closed 
};

module.exports = config;

// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "example"
//   // password: ""
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });