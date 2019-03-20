var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

function connectDb(env,callback) {
    connection.connect(function(err) {
        callback(err);
        if (err) throw err
            callback('You are now connected...');
    })    
}

module.exports = {
    connectDb,
    connection
};