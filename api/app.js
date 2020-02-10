var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config');
var db = require('./db');

var users = require('./routes/users');

var app = express();

app.listen(config.app.port, () => {
    console.log('server on port ' + config.app.port);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser())
app.use(cors())

app.get('/api/v1/connect', (req, res) => {
    console.log('works!');
})

app.post('/api/v1/users', (req, res) => {
    let request = req.body;
    if (request.email && request.password)
    {
        // search for combination
        let sql = `SELECT * FROM users WHERE email = '${request.email}' AND password = '${request.password}'`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(JSON.stringify(result));
        })            
    } else if (request.name) {
        // guest log in by name
        let sql = `
            INSERT INTO users (name) VALUES ('${request.name}');
        `;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(JSON.stringify(result.insertId));
        })            
        
    } else {
        // missing data
    }
})

app.get('/api/v1/timing/:uid', (req,res) => {
    let sql = "SELECT *, t.id AS time_id FROM `timings` t left join `users` u on t.user_id = u.id where t.user_id = " + req.params.uid;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    })            
})

app.get('/api/v1/timing', (req,res) => {
    let sql = "SELECT *, u.id AS user_id, t.id AS time_id FROM `timings` t left join `users` u on t.user_id = u.id";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    })            
})

app.post('/api/v1/timing', (req,res) => {
    let request = req.body;
    if (request.start_time && request.end_time)
    {
        if (request.type === 'edit')
        {
            let sql = `UPDATE timings
            SET start_time = '${request.start_time}', end_time = '${request.end_time}', duration = 'EDITED'
            WHERE id = '${request.time_id}';`
            db.query(sql, (err, result) => {
                if (err) throw err;
                res.send(JSON.stringify(result));
            })            
        } else {
            let sql = `INSERT INTO timings
            (user_id, start_time, end_time, duration)
            VALUES
            ('${request.user_id}', '${request.start_time}', '${request.end_time}', '${request.duration}' )`;
            db.query(sql, (err, result) => {
                if (err) throw err;
                res.send(JSON.stringify(result));
            })            
        }
    } else if (request.action === 'delete')
    {
        let sql = `DELETE FROM timings WHERE id = '${request.time_id}';`
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(JSON.stringify(result));
        })            
    }
})

app.on('error', function(err) {
    console.log("[mysql error]", err);
});

module.exports = app;