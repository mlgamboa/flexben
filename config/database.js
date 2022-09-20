const mysql = require('mysql');

const db = mysql.createConnection({
    host:  'localhost',
    user: 'root',
    password: '',
    database:'flexben'
})

db.connect(function(err){
    if(err){
        throw err;
    }
    console.log('MySQL Connected')
});

module.exports = db;