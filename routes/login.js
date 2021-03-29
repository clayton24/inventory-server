var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var config = require('../config.js');

var pool = new pg.Pool(config);

/* GET users listing. */
// router.post('/create', (request, response, next) => {
//  const { name, personality } = request.body;

//  pool.query(
//   'INSERT INTO product(p_name, p_price) VALUES($1, $2)',
//   [request.body.p_name, request.body.p_price],
//   (err, res) => {
//    if (err) return next(err);

//    response.redirect('/monsters');
//   }
//  );
// });



router.post('/', function(req, res, next) {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      return res.status(500).json({success: false, data: err});
    }
    const query1 = client.query("SELECT * FROM users where username = $1 and password = $2",[req.body.username,req.body.password]);
    query1.on('row', (row) => {
      results.push(row);
    });
    query1.on('end', () => {
      done();
      // pg.end();
      return res.json(results);
    });
  done(err);
  });
});

router.post('/getdata', function(req, res, next) {

  const results = [];

  pool.connect(function(err, client, done){
    if(err) {
      done();
      done(err);
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query('SELECT * FROM users where username=$1 and password=$2',[req.body.username,req.body.password]);

    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
    done(err);
  });
});



module.exports = router;
