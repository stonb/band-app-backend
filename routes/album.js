var env = require('../env');
var express = require('express');
var router = express.Router();
const Pool = require('pg').Pool
const pool = new Pool({
  user: env.DBUSER,
  host: env.DBHOST,
  database: env.DBDATABASE,
  password: env.DBPASSWORD,
  port: env.DBPORT,
});

// curl -X GET http://localhost:3000/user
router.get('/', (req,res) => {
    pool.query('SELECT * FROM album', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
})

// curl -X POST -H "Content-Type: application/json" -d '{"id":"5555","name":"ABC Ortho", "email":"info@abcortho.com"}' http://localhost:3000/user 
router.post('/', (req,res) => {
    if (users.length == 0)
    {
        users.push(req.body);
        res.send('USER:POST Received');
    }
    else
    {
        res.send("SERVER MESSAGE: please use PUT instead!");
    }
})

// curl -X PUT -H "Content-Type: application/json" -d '{"id":"5555","name":"ABC Ortho", "email":"info@abcortho.com"}' http://localhost:3000/user
router.put('/', (req,res) => {
    users.push(req.body);
    res.send('USER:PUT Received');
})

// curl -X DELETE -H "Content-Type: application/json" -d '{"id":"3333"}' http://localhost:3000/user
router.delete('/', (req,res) => {
    var requestId = req.body.id;
    console.log(users.length)
    for(i = 0; i < users.length; i++)
    {
        if (users[i].id == requestId) {
            users.splice(i,1);
            break;
        }
    }
    res.send('USER:DELETE Received');
    // res.end(JSON.stringify(users, null, 3));
})

module.exports = router;