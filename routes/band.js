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

// curl -X GET http://localhost:3000/band
router.get('/', (req,res) => {
    pool.query('SELECT * FROM band', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
})


router.post('/', (req,response) => {
    
    const band = req.body.band;
    const country = req.body.country;
    const genre = req.body.genre;
    const year = parseInt(req.body.year);

    console.log(req.body);

    if (band || country || genre || year)
    {
        pgQuery = 'INSERT INTO band(band_name, country, genre, formed_date) VALUES($1,$2,$3,$4) RETURNING *';
        pgValues =  [ band, country, genre, year];
        
        pool.query(pgQuery, pgValues, (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                console.log(res.rows[0])
                response.send(JSON.stringify({res:'BAND:POST Received'}));
            }
        })
    }
    else
    {
        console.log("Wrong DATA");
    }
})

// curl -X PUT -H "Content-Type: application/json" -d '{"id":"5555","name":"ABC Ortho", "email":"info@abcortho.com"}' http://localhost:3000/user
router.put('/', (req,res) => {
    users.push(req.body);
    res.send('USER:PUT Received');
})

// curl -X DELETE -H "Content-Type: application/json" -d '{"id":"3333"}' http://localhost:3000/user
router.delete('/:id', (req,response) => {
    const requestId = parseInt((req.params.id).replace(':', ''));
    console.log("GOT: " + requestId);

    if(requestId)
    {
        pgQuery = 'DELETE FROM band WHERE band_id =  $1';
        pgValue =  [requestId];

        pool.query(pgQuery, pgValue, (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                response.send(JSON.stringify({res:'BAND: DELETE Received'}));
            }
        })
    }
    else
    {
        console.log("DELETE: Wrong DATA");
    }
    // res.end(JSON.stringify(users, null, 3));
})

module.exports = router;