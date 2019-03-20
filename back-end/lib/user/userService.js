var DB = require('../config/dbConfig');
var { MESSAGES, CODES } = require('./userConstants');

const { connection } = DB;

function getCurrent(req, res) {
    if(req.params.id) {
        let select =   `SELECT * FROM (SELECT angle AS firstAngle FROM user WHERE unique_id = '${req.params.id}') first, (SELECT angle AS secondAngle FROM user WHERE unique_id != '${req.params.id}') second`;
        connection.query(select, (err, rows) => {
            if(rows) {
                res.send({code: CODES.SUCCESS, message: MESSAGES.SuccessGetUserData, data: rows})
            } else {
                res.send({code: CODES.BADREQUEST, message: MESSAGES.ErrrorGetUserData, data: rows})
            }
        });
    }
    
}

function addLocation(req, res) {

    connection.query('DELETE from user where unique_id = ?', req.body.unique_id)

    connection.query('INSERT INTO user SET ?', req.body, (err, rows) => {        
        if (err)  {            
            res.send({code: CODES.BADREQUEST, message: MESSAGES.ErrrorAddUserData})
        } else {
            res.send({code: CODES.SUCCESS, message: MESSAGES.SuccessAddUserData})
        }
    })
}

function getOneUser(req, res) {
    connection.query('SELECT * FROM user WHERE unique_id=?', req.params.id, (err, rows) => {
        if(rows) {
            if(rows.lengh > 0) {
                res.send({code: CODES.SUCCESS, message: MESSAGES.SuccessGetUserData, data: rows})
            } else {
                res.send({code: CODES.SUCCESS, message: MESSAGES.ErrrorGetUserData, data: []})
            }
        } else {
            res.send({code: CODES.BADREQUEST, message: MESSAGES.ErrrorGetUserData, data: rows})
        }
    })
}

function updateUser(req, res) {
    connection.query('UPDATE user SET ? WHERE unique_id=?', [req.body, req.params.id], (err, rows) => {
        console.log("err, rows", err, rows);
        if (err)  {
            res.send({code: CODES.BADREQUEST, message: MESSAGES.ErrrorUpdateUserData})
        } else {
            res.send({code: CODES.SUCCESS, message: MESSAGES.SuccessUpdateUserData})
        }
    })
}

module.exports = {
    getCurrent,
    addLocation,
    getOneUser,
    updateUser
}